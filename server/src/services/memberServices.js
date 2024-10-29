import APIError, { HttpStatusCode } from "../exception/errorHandler.js";
import MemberCategory from "../models/member_category.js";
import {
  MemberData,
  Dependent,
  Wallet,
  MemberTransactionHistory,
} from "../models/member_Model.js";
import mongoose from "mongoose";
import CATEGORY_CHARGES  from "../constants/subscriptionCharges.js";
import ValidatorHelper from "../helpers/validator/validatorHelper.js"
import MemberCheckInOut from '../models/member_checkinout.js';
import moment from 'moment';

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
    case "RESIDENT":
      prefix = "MM";
      break;
    case "ASSOCIATE":
      prefix = "MA";
      break;
    case "SENIOR CITIZEN RESIDENT":
      prefix = "MMS";
      break;
    case "SENIOR CITIZEN ASSOCIATE":
      prefix = "MAS";
      break;
    case "SENIOR CITIZEN CORPORATE":
      prefix = "MCS";
      break;
    case "CORPORATE":
      prefix = "MC";
      break;
    default:
      prefix = "MM"; // Default to RESIDENT if category not recognized
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
  const nextMarch = new Date(
    `March 31, ${
      now.getMonth() > 2 ? now.getFullYear() + 1 : now.getFullYear()
    }`
  );

  const validUpTo = Math.floor(nextMarch.getTime()); // Convert to UNIX timestamp

  // Calculate duration in months
  const months =
    (nextMarch.getFullYear() - now.getFullYear()) * 12 +
    (nextMarch.getMonth() - now.getMonth());

  return {
    validUpTo,
    duration: `${months} Month${months > 1 ? "s" : ""}`,
    months,
  };
};

// Helper function to calculate total amount
const calculateTotalAmount = (category, months) => {
  const chargeDetails = CATEGORY_CHARGES[category];
  console.log(chargeDetails, "in calculateTotalAmount");
  if (!chargeDetails) {
    throw new Error(`Invalid category: ${category}`);
  }

  const { monthlyCharge } = chargeDetails;
  const subscriptionFee = monthlyCharge * months;
  const annualFee = category === "CORPORATE" ? 2000 : 1000;
  const totalBeforeGST = subscriptionFee + annualFee;
  const gst = totalBeforeGST * 0.18;
  const totalAmount = totalBeforeGST + gst;

  return {
    totalAmount,
    gst,
    totalBeforeGST,
    annualFee,
    subscriptionFee,
    monthlyCharge,
    months,
  };
};

// Helper function to create a wallet and initial transaction
const createWalletAndInitialTransaction = async (member, session) => { 

  const { duration, months } = calculateValidUpToAndDuration();
  const {
    totalAmount,
    gst,
    totalBeforeGST,
    annualFee,
    subscriptionFee,
    monthlyCharge,
  } = calculateTotalAmount(member.memberCategory, months);

  // Create a detailed description
  const description = `Subscription charge for ${months} month(s): Single month payment: ₹${monthlyCharge}, Total subscription fee: ₹${subscriptionFee}, Annual fee: ₹${annualFee}, Amount before GST: ₹${totalBeforeGST}, GST (18%): ₹${gst}, Total amount: ₹${totalAmount}`;

  let intialbalance = Number(0 - totalAmount);
  // Create a wallet for the member
  const wallet = new Wallet({
    member_id: member._id,
    memberId: member.memberId,
    balance: intialbalance,
    createdBy: member.createdBy,
    updatedBy: member.updatedBy,
  });
  await wallet.save({ session });
  // Create an initial transaction with narration and duration for the calculated months
  const transaction = new MemberTransactionHistory({
    member_id: member._id,
    memberId: member.memberId,
    transactionDate: new Date(),
    amount: totalAmount, // Example amount for subscription charge
    transactionType: "Debit",
    remarks: `Subscription charge for ${duration}`,
    narration: "Registration Charges",
    description: description,
  });
  await transaction.save({ session });
};

// Create Member
export const createMember = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate mobileNumber and emailId uniqueness for members
    const existingMemberWithMobile = await MemberData.findOne({
      mobileNumber: data.mobileNumber,
    });
    if (existingMemberWithMobile) {
      throw new APIError(
        "Mobile number already exists for another member.",
        400,
        true,
        "Mobile number conflict"
      );
    }

    const existingMemberWithEmail = await MemberData.findOne({
      emailId: data.emailId,
    });
    if (existingMemberWithEmail) {
      throw new APIError(
        "Email ID already exists for another member.",
        400,
        true,
        "Email ID conflict"
      );
    }

    // Set the dateOfMembership to the current date in UNIX format
    data.dateOfMembership = Math.floor(Date.now()); // UNIX timestamp

    // Generate the memberId
    data.memberId = await generateMemberId(
      data.memberCategory,
      data.dateOfMembership
    );

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


export const createDependent = async (memberId, dependentData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate the member ID
    const member = await MemberData.findOne({ memberId: memberId });
    if (!member) {
      throw new Error("Member not found");
    }

    // Validate mobile number length and digits
    if (!dependentData.mobileNumber || !ValidatorHelper.validateMobile(dependentData.mobileNumber)) {
      throw new Error("Mobile number must be exactly 10 digits and contain only numbers.");
    }

    // Validate email format
    if (dependentData.emailId && !ValidatorHelper.validateEmail(dependentData.emailId)) {
      throw new Error("Invalid email address");
    }

    // Convert birthDate and currentDate to Unix timestamps
    const currentDateUnix = Math.floor(Date.now() / 1000); // Current date in Unix time (seconds)
    const birthDateUnix = Math.floor(new Date(dependentData.dateOfBirth).getTime() / 1000); // Birthdate in Unix time (seconds)
    
    // Calculate 18 years in seconds (18 * 365.25 days * 24 hours * 60 minutes * 60 seconds)
    const eighteenYearsInSeconds = 18 * 365.25 * 24 * 60 * 60;

    // Compare the current time with the birth time + 18 years
    if ((currentDateUnix - birthDateUnix) > eighteenYearsInSeconds) {
      throw new Error("Dependent cannot be registered if older than 18 years");
    }

    // Generate dependentId based on the number of dependents
    const dependentCount = member.dependents.length;
    const dependentId = `${memberId}D${dependentCount + 1}`;

    // Store the birthDate in Unix time
    dependentData.dateOfBirth = birthDateUnix;

    // Create a new dependent
    const dependent = new Dependent({
      dependentId,
      member_id: member._id,  // MongoDB ObjectId reference for the member
      memberId: member.memberId,  // The custom member ID
      ...dependentData,
    });

    // Save the dependent in the session
    const savedDependent = await dependent.save({ session });

    // Update member with the new dependent ID
    member.dependents.push(dependentId);  // Use generated dependentId
    await member.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return savedDependent;
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    throw new Error("Error creating dependent: " + error.message);
  }
};


// Update Member
export const updateMember = async (id, data) => {
  try {
    const updatedMember = await MemberData.findOneAndUpdate(
      { memberId: String(id) },
      data,
      { new: true }
    );

    // Check if member was not found
    if (!updatedMember) {
      throw new Error(`Member with ID ${id} not found`);
    }

    return updatedMember;
  } catch (error) {
    throw new Error("Error updating member: " + error.message);
  }
};



// Update Dependent
export const updateDependent = async (dependentId, data) => {
  try {
    // Fetch the existing dependent to validate any changes
    const dependent = await Dependent.findOne({ dependentId });
    if (!dependent) {
      throw new Error(`Dependent with ID ${dependentId} not found`);
    }

    // Validate mobile number if provided
    if (data.mobileNumber && !ValidatorHelper.validateMobile(data.mobileNumber)) {
      throw new Error("Mobile number must be exactly 10 digits and contain only numbers.");
    }

    // Validate email if provided
    if (data.emailId && !ValidatorHelper.validateEmail(data.emailId)) {
      throw new Error("Invalid email address.");
    }

    // Validate age based on dateOfBirth if provided (age should be <= 18)
    if (data.dateOfBirth) {
      let birthDate = data.dateOfBirth
      if (isNaN(new Date(birthDate).getTime())) {
        throw new Error("Invalid date format. Expected format is 'dd-mm-yyyy'.");
      }

      // Convert birthDate and currentDate to Unix timestamps
      const currentDateUnix = Math.floor(Date.now() / 1000); // Current date in Unix time (seconds)
      const birthDateUnix = Math.floor(new Date(birthDate).getTime() / 1000); // Birthdate in Unix time (seconds)
     
      
      // Calculate 18 years in seconds (18 * 365.25 days * 24 hours * 60 minutes * 60 seconds)
      const eighteenYearsInSeconds = 18 * 365.25 * 24 * 60 * 60;

      // Compare the current time with the birth time + 18 years
      if ((currentDateUnix - birthDateUnix) > eighteenYearsInSeconds) {
        throw new Error("Dependent cannot be registered if older than 18 years.");
      }

      // Store the dateOfBirth as a Unix timestamp in the data object
      data.dateOfBirth = birthDateUnix;
    }

    // Perform the update with the validated data
    const updatedDependent = await Dependent.findOneAndUpdate(
      { dependentId },
      data,
      { new: true }
    );

    if (!updatedDependent) {
      throw new Error(`Dependent with ID ${dependentId} could not be updated.`);
    }

    return updatedDependent;
  } catch (error) {
    throw new Error("Error updating dependent: " + error.message);
  }
};

// Update Member Status
export const updateMemberStatus = async (id, data) => {
  try {
    let status = data.status;
    let updateBy = data.updateBy;
    const updateMember = await MemberData.findOneAndUpdate(
      { memberId: String(id) },  // Condition to match the memberId
      { 
        $set: { 
          membershipStatus: status,  // Update membership status
          updatedBy: updateBy        // Update the updatedBy field
        } 
      },
      { new: true }  // This ensures the updated document is returned
    );

    if (!updateMember) {
      throw new Error(`Member with ID ${id} not found`);
    }

    return updateMember;
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
    const membersWithBalances = await MemberData.aggregate([
      {
        $lookup: {
          from: 'members_wallets', // Replace with your actual wallet collection name if different
          localField: 'memberId', // The field in the 'MemberData' collection
          foreignField: 'memberId', // The field in the 'Wallet' collection
          as: 'walletInfo' // The result will be stored here
        }
      },
      {
        $unwind: {
          path: '$walletInfo',
          preserveNullAndEmptyArrays: true // In case a member has no wallet, preserve the document
        }
      },
      {
        $addFields: {
          balance: { $ifNull: ['$walletInfo.balance', 0] } // If no walletInfo is found, set balance to 0
        }
      },
      {
        $project: {
          _id: 1,
          memberId: 1,
          memberCategory: 1,
          memberType: 1,
          title: 1,
          dateOfMembership: 1,
          firstName: 1,
          middleName: 1,
          surname: 1,
          fatherName: 1,
          husbandName: 1,
          spouseName: 1,
          gender: 1,
          dateOfBirth: 1,
          maritalStatus: 1,
          nationality: 1,
          bloodGroup: 1,
          mobileNumber: 1,
          emailId: 1,
          phoneNumber: 1,
          membershipStatus: 1,
          validUpTo: 1,
          panNumber: 1,
          weddingDate: 1,
          serviceBusinessDetail: 1,
          occupation: 1,
          organization: 1,
          designation: 1,
          address: 1,
          emergencyContactName: 1,
          emergencyContactNumber: 1,
          emergencyContactRelation: 1,
          createdBy: 1,
          updatedBy: 1,
          dependents: 1,
          createdAt: 1,
          updatedAt: 1,
          balance: 1 // Include the wallet balance
        }
      }
    ]);

    return membersWithBalances;
  } catch (error) {
    throw new Error('Error fetching members with balance: ' + error.message);
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

export const getMemberById = async (memberId) => {
  try {
    // Fetch the member by memberId
    const member = await MemberData.findOne({ memberId });
    if (!member) {
      throw new Error(`Member with ID ${memberId} not found`);
    }

    // Fetch the dependents based on the dependentId stored in the member's dependents array
    const dependents = await Dependent.find({ dependentId: { $in: member.dependents } });

    // Fetch the wallet balance based on the memberId
    const wallet = await Wallet.findOne({ memberId });

    // Add the dependents data and wallet balance to the member object
    const memberWithDependentsAndBalance = {
      ...member._doc, // Access the member's document data
      dependents, // Include the full dependent data
      balance: wallet ? wallet.balance : 0, // Add balance if wallet exists, default to 0
    };

    return memberWithDependentsAndBalance;
  } catch (error) {
    throw new Error("Error fetching member: " + error.message);
  }
};


// Deposit in wallet service
export const depositInWalletService = async (data) => {
  let { memberId, amount, depositType, modeOfTransaction, transactionRef, chequeNumber, bankName, branchName,remarks } = data;

  // Validate required fields
  if (!memberId || !amount || !depositType || !modeOfTransaction) {
      throw new Error('Missing required fields: memberId, amount, depositType, or modeOfTransaction');
  }

  if (amount <= 0) {
      throw new Error('Deposit amount must be greater than zero');
  }

  // Find the member's wallet
  const wallet = await Wallet.findOne({ memberId });
  if (!wallet) {
      throw new Error('Member wallet not found');
  }
  
  let transactionData = {
    memberId,
    member_id: wallet.member_id,
    amount,
    transactionType: 'Credit',
    remarks: `${remarks} `,
    modeOfTransaction,
    description: `Deposit of ${amount}, through ${modeOfTransaction} against ${depositType}`,
    narration: `${depositType}`
};
  // Check for duplicate transactions based on transactionRef, chequeNumber, or amount
  let duplicateTransaction = null;
  switch (modeOfTransaction) {
      case 'Cash':
          // Cash transactions might not need a duplicate check, since they don't rely on external references
          break;

      case 'UPI':
          if (!transactionRef) {
              throw new Error('UPI transaction reference is required');
          }
          // Check if a transaction with the same reference already exists
          duplicateTransaction = await MemberTransactionHistory.findOne({ transactionRef, memberId });
          if (duplicateTransaction) {
              throw new Error('Duplicate transaction detected for UPI reference');
          }
          transactionData.transactionRef =transactionRef
          break;

      case 'NEFT':
          if (!transactionRef) {
              throw new Error('NEFT transaction reference is required');
          }
          // Check if a transaction with the same NEFT reference already exists
          duplicateTransaction = await MemberTransactionHistory.findOne({ transactionRef, memberId });
          if (duplicateTransaction) {
              throw new Error('Duplicate transaction detected for NEFT reference');
          }
          transactionData.transactionRef = transactionRef
          break;

      case 'Cheque':
          if (!chequeNumber || !bankName || !branchName) {
              throw new Error('Cheque details are required');
          }
          // Check if a transaction with the same cheque number and memberId already exists
          duplicateTransaction = await MemberTransactionHistory.findOne({ chequeNumber, memberId });
          if (duplicateTransaction) {
              throw new Error('Duplicate cheque transaction detected');
          }
          transactionData.chequeNumber = chequeNumber;
          transactionData.bankName = bankName;
          transactionData.branchName = branchName;
          transactionData.chequeStatus = 'Pending'; // Initially set cheque status to "Pending"
          // Do NOT update wallet balance yet, wait for cheque clearance
          break;

      default:
          throw new Error('Invalid mode of transaction');
  }

  // Save the transaction first
  const transaction = new MemberTransactionHistory(transactionData);
  await transaction.save();

  // Now, update the wallet balance for non-cheque transactions
  if (modeOfTransaction !== 'Cheque') {
      wallet.balance += amount;
      await wallet.save();
  }

  return { updatedBalance: wallet.balance, transactionId: transaction._id };
};

// Withdraw from wallet service
export const withdrawFromWalletService = async (data) => {
let {memberId, amount, withdrawFor, modeOfTransaction, remarks, invoiceNumber, transactionRef} = data

  if (!memberId || !amount) {
      throw new Error('Missing required fields: memberId or amount');
  }
  if (amount <= 0) {
      throw new Error('Withdrawal amount must be greater than zero');
  }

  const wallet = await Wallet.findOne({ memberId });
  if (!wallet) {
      throw new Error('Member wallet not found');
  }
  if (wallet.balance < amount) {
      throw new Error('Insufficient balance in wallet');
  }

  // Update wallet balance
  wallet.balance -= amount;
  await wallet.save();

//   const invoiceUrl = await invoiceGenerator({
//     memberId,
//    invoiceNumber
// });
 const invoiceUrl = null;

  // Log the transaction in member history
  const transaction = new MemberTransactionHistory({
      memberId,
      member_id: wallet.member_id,
      transactionDate: Date.now(),
      amount,
      transactionType: 'Debit',
      modeOfTransaction: `${modeOfTransaction}`,
      transactionRef,
      remarks: `${remarks}`,
      description: `Withdrawal of ${amount} , at ${withdrawFor}`,
      narration: `${withdrawFor}`,
      supportDocuments: invoiceNumber
  });

  await transaction.save();

  return { updatedBalance: wallet.balance };
};

// Get transaction history service
export const getTransactionHistoryService = async (memberId) => {
  if (!memberId) {
      throw new Error('Missing required field: memberId');
  }
  const member = await MemberData.findOne({memberId: memberId});
  if (!member) {
      throw new Error('Member not found with id : ' + memberId);
  }
  if (!memberId) {
    throw new Error('Missing required field: memberId');
}

  const transactions = await MemberTransactionHistory.find({ memberId }).sort({ transactionDate: -1 });
  if (!transactions || transactions.length === 0) {
      throw new Error('No transaction history found for this member');
  }

  return transactions;
};

export const updateChequeStatusService = async (chequeNumber, status) => {
  const validStatuses = ['Pending', 'Cleared', 'Bounced'];

  if (!validStatuses.includes(status)) {
      throw new Error('Invalid cheque status');
  }

  // Find the cheque transaction
  const transaction = await MemberTransactionHistory.findOne({ chequeNumber });
  if (!transaction || transaction.modeOfTransaction !== 'Cheque') {
      throw new Error('Cheque transaction not found');
  }

if ( transaction.chequeStatus == 'Cleared' ) {
      throw new Error('Cheque is already cleared and deposited');
  }
  // Update cheque status
  transaction.chequeStatus = status;
  await transaction.save();

  // Handle cheque clearance
  if (status === 'Cleared') {
      const wallet = await Wallet.findOne({ memberId: transaction.memberId });
      if (!wallet) {
          throw new Error('Member wallet not found');
      }

      // Add the cheque amount to the wallet
      wallet.balance += transaction.amount;
      await wallet.save();

      return { message: 'Cheque cleared and wallet balance updated', updatedBalance: wallet.balance };
  } 
  
  // Handle cheque bounce
  else if (status === 'Bounced') {
      const bounceCharge = 650; // Bounce penalty
      const wallet = await Wallet.findOne({ memberId: transaction.memberId });
      if (!wallet) {
          throw new Error('Member wallet not found');
      }

      // Deduct the bounce charge, allow negative balance
      wallet.balance -= bounceCharge;
      await wallet.save();

      // Log the bounce penalty in the transaction history
      const penaltyTransaction = new MemberTransactionHistory({
          memberId: transaction.memberId,
          member_id: transaction.member_id,
          transactionDate: Date.now(),
          amount: bounceCharge,
          transactionType: 'Debit',
          modeOfTransaction: 'Penalty',
          remarks: 'Cheque Bounce Penalty',
          description: `Penalty for cheque bounce of ₹${bounceCharge}`,
          narration: 'Bounce penalty applied',
          supportDocuments: null  // Optional, as no documents are needed for penalty
      });
      await penaltyTransaction.save();

      return { message: 'Cheque bounced, penalty applied, and wallet balance updated', updatedBalance: wallet.balance };
  }

  return { message: `Cheque status updated to ${status}` };
};


// Check-in service
export const checkInMemberService = async (memberId, createdBy, location) => {
  // Validate if the member exists
  const member = await MemberData.findOne({ memberId });

  if (!member) {
      throw new Error('Invalid memberId: Member does not exist');
  }

  // Check if the member is already checked in at the same location
  const existingCheckIn = await MemberCheckInOut.findOne({ memberId: memberId, isCheckedIn: true, location });

  if (existingCheckIn) {
      throw new Error(`Member is already checked in at location: ${location}`);
  }

  // If the member is checked in at a different location, treat it as a new check-in
  const newCheckIn = new MemberCheckInOut({
      member_id: member._id,  // Use the _id from Member collection
      memberId,
      isCheckedIn: true,
      location,
      createdBy
  });

  await newCheckIn.save();
  return `Member ${memberId} checked in successfully at ${location}`;
};

// Check-out service
export const checkOutMemberService = async (memberId, updatedBy, location) => {
  // Validate if the member exists
  const member = await MemberData.findOne({ memberId });

  if (!member) {
      throw new Error('Invalid memberId: Member does not exist');
  }

  // Check if the member is checked in at the same location
  const existingCheckIn = await MemberCheckInOut.findOne({ memberId: memberId, isCheckedIn: true, location });

  if (!existingCheckIn) {
      throw new Error(`Member has not checked in at location: ${location}`);
  }

  // Calculate total stay time
  const checkOutTime = new Date();
  const checkInTime = existingCheckIn.checkInTime;
  const totalTimeStay = moment(checkOutTime).diff(moment(checkInTime), 'minutes');

  // Update the check-out record
  existingCheckIn.isCheckedIn = false;
  existingCheckIn.isCheckedOut = true;
  existingCheckIn.checkOutTime = checkOutTime;
  existingCheckIn.totalTimeStay = totalTimeStay;
  existingCheckIn.updatedBy = updatedBy;

  await existingCheckIn.save();

  return `Member ${memberId} checked out from ${location} successfully. Total stay: ${totalTimeStay} minutes.`;
};


export const getAllHistory = async (page, limit, startDate, endDate) => {
 
  if (limit <= 0 || page <= 0) {
      throw new Error('Invalid page or limit');
  }

  // Parse and validate the date filters if provided
  let start = null;
  let end = null;

  if (startDate) {
      try {
          start = new Date(startDate);
      } catch (error) {
          throw new Error('Invalid start date');
      }
  }

  if (endDate) {
      try {
          end = new Date(endDate);
      } catch (error) {
          throw new Error('Invalid end date');
      }
  }

  // Create the aggregation pipeline
  const pipeline = [];

  // Date range filter if startDate or endDate is provided
  if (start || end) {
    const dateFilter = {};
    if (start) {
        // Ensure `start` is a valid Date object
        dateFilter.$gte = new Date(start);
    }
    if (end) {
        // Ensure `end` is a valid Date object
        dateFilter.$lte = new Date(end);
    }
    pipeline.unshift({
        $match: { checkInTime: dateFilter }
    });
}

  // Sort the results by checkInTime (newest first)
  pipeline.push({
      $sort: { checkInTime: -1 }
  });

  // Pagination: skip and limit
  pipeline.push(
      {
          $skip: (page - 1) * limit
      },
      {
          $limit: parseInt(limit)
      }
  );
console.log(pipeline)
  // Count total records
  const totalPipeline = [...pipeline];
  totalPipeline.push({
      $count: 'totalRecords'
  });

  // Execute both the aggregation and count in parallel for efficiency
  const [history, total] = await Promise.all([
      MemberCheckInOut.aggregate(pipeline),
      MemberCheckInOut.aggregate(totalPipeline)
  ]);

  const totalRecords = total.length > 0 ? total[0].totalRecords : 0;

  return {

      history,
      totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit)
  };
};


// Get history of a single member with pagination
export const getMemberHistory = async (memberId, page, limit) => {
    const history = await MemberCheckInOut.find({ memberId })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ checkInTime: -1 });

    const totalRecords = await MemberCheckInOut.countDocuments({ memberId });

    return {
        history,
        totalRecords,
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit)
    };
};
