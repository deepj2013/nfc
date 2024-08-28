import APIError, { HttpStatusCode } from "../exception/errorHandler.js";
import {
  comparePassword,
  encryptPassword,
} from "../helpers/passwordEncryption/passwordEncryption.js";
import {
  getTokenOfUserService,
  generateTokenService,
} from "../services/authServices.js";
import MemberCategory from "../models/member_category.js";
import {
  MemberData,
  Dependent,
  Wallet,
  MemberTransactionHistory,
} from "../models/member_Model.js";
import CATEGORY_CHARGES from "../constants/subscriptionCharges.js"
import mongoose from "mongoose";

export const createMemberCategory = async (data) => {
  let sequenceId = 1;
  try {
    const lastMember = await MemberCategory.findOne().sort({
      memberCategoryId: -1,
    });
    if (lastMember) {
      sequenceId = lastMember.memberCategoryId + 1;
    }

    const newMemberCategory = new MemberCategory({
      memberCategory: data.memberCategory,
      memberCategoryId: sequenceId,
      status: data.status,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    });

    await newMemberCategory.save();
    return newMemberCategory;
  } catch (error) {
    throw new Error("Error creating member category: " + error.message);
  }
};

export const getMemberCategories = async () => {
  try {
    return await MemberCategory.find({}, { _id: 0, __v: 0 });
  } catch (error) {
    throw new Error("Error fetching member categories: " + error.message);
  }
};

export const updateMemberCategory = async (id, data) => {
  try {
    const updatedMemberCategory = await MemberCategory.findOneAndUpdate(
      { memberCategoryId: id }, // Use memberCategoryId if you're not using _id
      data,
      { new: true } // Returns the updated document
    );
    return updatedMemberCategory;
  } catch (error) {
    throw new Error("Error updating member category: " + error.message);
  }
};

export const toggleMemberCategoryStatus = async (id, status) => {
  try {
    const updatedMemberCategory = await MemberCategory.findOneAndUpdate(
      { memberCategoryId: id },
      { status: status },
      { new: true }
    );
    return updatedMemberCategory;
  } catch (error) {
    throw new Error("Error toggling member category status: " + error.message);
  }
};



// Helper function to generate memberId
const generateMemberId = async (category, dateOfMembership) => {
    let prefix;
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit number

    switch (category) {
        case 'RESIDENT':
            prefix = 'MM';
            break;
        case 'ASSOCIATE':
            prefix = 'MA';
            break;
        case 'SENIOR CITIZEN RESIDENT':
            prefix = 'MMS';
            break;
        case 'SENIOR CITIZEN ASSOCIATE':
            prefix = 'MAS';
            break;
        case 'SENIOR CITIZEN CORPORATE':
            prefix = 'MCS';
            break;
        case 'CORPORATE':
            prefix = 'MC';
            break;
        default:
            prefix = 'MM'; // Default to RESIDENT if category not recognized
    }

    const memberId = `${prefix}${randomNumber}`;
    const existingMember = await MemberData.findOne({ memberId });

    if (existingMember) {
        // Recursively generate a new ID if a conflict is found
        return await generateMemberId(category, dateOfMembership);
    }

    return memberId;
};


// Helper function to calculate ValidUpTo and duration in months
const calculateValidUpToAndDuration = () => {
  const now = new Date();
  const nextMarch = new Date(`March 31, ${now.getMonth() > 2 ? now.getFullYear() + 1 : now.getFullYear()}`);
  
  const validUpTo = Math.floor(nextMarch.getTime()); // Convert to UNIX timestamp
  
  // Calculate duration in months
  const months = (nextMarch.getFullYear() - now.getFullYear()) * 12 + (nextMarch.getMonth() - now.getMonth());

  return { validUpTo, duration: `${months} Month${months > 1 ? 's' : ''}`, months };
};

// Helper function to calculate total amount
const calculateTotalAmount = (category, months) => {
  const chargeDetails = CATEGORY_CHARGES[category];
  if (!chargeDetails) {
      throw new Error(`Invalid category: ${category}`);
  }

  const { monthly } = chargeDetails;
  const subscriptionFee = monthly * months;
  const annualFee = category === 'CORPORATE' ? 2000 : 1000;
  const totalBeforeGST = subscriptionFee + annualFee;
  const gst = totalBeforeGST * 0.18;
  const totalAmount = totalBeforeGST + gst;

  return totalAmount, gst, totalBeforeGST, annualFee, subscriptionFee;
};

// Helper function to create a wallet and initial transaction
const createWalletAndInitialTransaction = async (member, session) => {
  // Create a wallet for the member
  const wallet = new Wallet({
      member_id: member._id,
      memberId: member.memberId,
      balance: 0,
      createdBy: member.createdBy,
      updatedBy: member.updatedBy,
  });
  await wallet.save({ session });

  // Calculate validUpTo, duration, and total amount
  const { duration, months } = calculateValidUpToAndDuration();
  const totalAmount = calculateTotalAmount(member.memberCategory, months);
    // Create an initial transaction with narration and duration for the calculated months
    const transaction = new MemberTransactionHistory({
        member_id: member._id,
        memberId: member.memberId,
        transactionDate: new Date(),
        amount: totalAmount, // Example amount for subscription charge
        transactionType: 'Debit',
        remarks: `Subscription charge for ${duration}`,
        narration: 'Subscription charge Registration',
    });
    await transaction.save({ session });
};

// Create Member
export const createMember = async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Validate mobileNumber and emailId uniqueness for members
        const existingMemberWithMobile = await MemberData.findOne({ mobileNumber: data.mobileNumber });
        if (existingMemberWithMobile) {
            throw new APIError("Mobile number already exists for another member.", 400, true, "Mobile number conflict");
        }

        const existingMemberWithEmail = await MemberData.findOne({ emailId: data.emailId });
        if (existingMemberWithEmail) {
            throw new APIError("Email ID already exists for another member.", 400, true, "Email ID conflict");
        }

        // Set the dateOfMembership to the current date in UNIX format
        data.dateOfMembership = Math.floor(Date.now()); // UNIX timestamp

        // Generate the memberId
        data.memberId = await generateMemberId(data.memberCategory, data.dateOfMembership);

        // Set ValidUpTo to the next March 31st and calculate duration
        const { validUpTo } = calculateValidUpToAndDuration();
        data.validUpTo = validUpTo;

        const member = new MemberData(data);
        const savedMember = await member.save({ session });

        // Create wallet and initial transaction
        await createWalletAndInitialTransaction(savedMember, session);

        await session.commitTransaction();
        session.endSession();

        return savedMember;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        if (error instanceof APIError) {
            throw error; // Re-throw APIError to be handled by middleware
        }
        throw new APIError("Internal Server Error", 500, true, error.message);
    }
};


// Create Dependent
export const createDependent = async (memberId, dependentData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const member = await MemberData.findById(memberId);
    if (!member) {
      throw new Error("Member not found");
    }

    const dependent = new Dependent({
      ...dependentData,
      memberId: member._id,
    });
    const savedDependent = await dependent.save({ session });

    // Update member with dependent ID
    member.dependents.push(savedDependent.dependentId);
    await member.save({ session });

    await session.commitTransaction();
    session.endSession();

    return savedDependent;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Error creating dependent: " + error.message);
  }
};

// Update Member
export const updateMember = async (id, data) => {
  try {
    const updatedMember = await MemberData.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedMember;
  } catch (error) {
    throw new Error("Error updating member: " + error.message);
  }
};

// Update Dependent
export const updateDependent = async (dependentId, data) => {
  try {
    const updatedDependent = await Dependent.findOneAndUpdate(
      { dependentId },
      data,
      { new: true }
    );
    return updatedDependent;
  } catch (error) {
    throw new Error("Error updating dependent: " + error.message);
  }
};

// Update Member Status
export const updateMemberStatus = async (id, status) => {
  try {
    const updatedMember = await MemberData.findByIdAndUpdate(
      id,
      { membershipStatus: status },
      { new: true }
    );
    return updatedMember;
  } catch (error) {
    throw new Error("Error updating member status: " + error.message);
  }
};

// Update Dependent Status
export const updateDependentStatus = async (dependentId, status) => {
  try {
    const updatedDependent = await Dependent.findOneAndUpdate(
      { dependentId },
      { status },
      { new: true }
    );
    return updatedDependent;
  } catch (error) {
    throw new Error("Error updating dependent status: " + error.message);
  }
};

// Get List of Members
export const getAllMembers = async () => {
  try {
    const members = await MemberData.find().populate("dependents");
    return members;
  } catch (error) {
    throw new Error("Error fetching members: " + error.message);
  }
};

// Get Dependent Related to Member
export const getDependentsByMember = async (memberId) => {
  try {
    const dependents = await Dependent.find({ memberId });
    return dependents;
  } catch (error) {
    throw new Error("Error fetching dependents: " + error.message);
  }
};

// Get Single Member Detail by MemberId
export const getMemberById = async (memberId) => {
  try {
    const member = await MemberData.findOne({ memberId }).populate(
      "dependents"
    );
    return member;
  } catch (error) {
    throw new Error("Error fetching member: " + error.message);
  }
};
