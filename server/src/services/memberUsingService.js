import { MemberData } from '../models/member_Model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../utils/HttpStatusCode.js';
import { APIError } from '../utils/APIError.js';
import { sendOtpByMail, sendOtpByWhatsapp } from '../helpers/otpHelper.js'; // you'll define these
import { generateNumericOTP } from '../helpers/commonHelper.js';
import OtpToken from '../models/otpModel.js'
import MemberCredentials from '../models/member_credentials.js';
import { maskMobile, maskName } from '../helpers/utilityHelper/utilityHelper.js';
import { getObjectId } from '../helpers/mongoose/mongooseHelpers.js';
import { isValidObjectId } from 'mongoose';


const generateNumericOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const generatePasswordRequest = async ({ memberId }) => {
    if (!memberId) throw new Error("Member ID is required.");

    const member = await MemberData.findOne({ memberId });
    if (!member) throw new Error("Member not found.");

    const existingCreds = await MemberCredentials.findOne({ memberId });
    if (existingCreds) {
        return {
            status: 400,
            message: "Password already generated. Please use 'Forgot Password'."
        };
    }

    let otpDoc = await OtpToken.findOne({
        memberId,
        isUsed: false,
        expiresAt: { $gte: new Date() }
    });

    let otp;
    if (otpDoc) {
        otp = otpDoc.otp;
    } else {
        await OtpToken.deleteMany({ memberId });

        otp = generateNumericOTP(6);
        const expiry = new Date(Date.now() + 5 * 60 * 1000);
        await OtpToken.create({ memberId, otp, expiresAt: expiry });
    }

    const msg = `Your OTP: ${otp} to set your password`;

    if (member.emailId) await sendOtpByMail(member.emailId, msg);
    if (member.mobileNumber) await sendOtpByWhatsapp(member.mobileNumber, msg);

    return {
        status: 200,
        message: "OTP sent. Please use it to set your password.",
        sentTo: {
            email: member.emailId,
            mobile: member.mobileNumber
        }
    };
};

//Login
export const memberloginServics = async ({ memberId, password }) => {
    if (!memberId || !password) {
      throw new Error("Member ID and Password are required.");
    }
  
    // Step 1: Check if credentials exist
    const credentials = await MemberCredentials.findOne({ memberId });
  
    if (credentials) {
      const isMatch = await bcrypt.compare(password, credentials.password);
      if (!isMatch) {
        throw new Error("Member ID or password is incorrect.");
      }
  
      const member = await MemberData.findOne({ memberId });
      if (!member) {
        throw new Error("Member profile not found.");
      }
  
      const token = jwt.sign(
        { userId: member._id, memberId: member.memberId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );
  
      return {
        status: HttpStatusCode.OK,
        message: "Login successful.",
        token,
        memberId: member.memberId,
        name: `${member.firstName} ${member.surname}`.trim(),
        mobileNumber: member.mobileNumber,
        emailId: member.emailId,
        profilePicture: member.profilePicture || null,
        memberCategory: member.memberCategory || null,
      };
    }
  
    // Step 2: If no credentials found, check if member exists
    const member = await MemberData.findOne({ memberId });
    if (member) {
      throw new Error("Password not generated. Please use Forgot Password to create one.");
    }
  
    // Step 3: If no member found at all
    throw new Error("Invalid Member ID.");
  };

// Send OTP (used for login, reset, etc.)
export const sendOtp = async ({ memberId, purpose = "reset" }) => {
    if (!memberId) throw new Error("Member ID is required.");
  
    const member = await MemberData.findOne({ memberId });
    if (!member) throw new Error("Member not found.");
  
    const now = new Date();
  
    // Step 1: Check for an existing valid OTP
    let existingOtpDoc = await OtpToken.findOne({
      memberId,
      purpose,
      isUsed: false,
      expiresAt: { $gt: now }
    });
  
    let otp;
    if (existingOtpDoc) {
      // Reuse existing OTP
      otp = existingOtpDoc.otp;
      console.log(`Reusing existing OTP: ${otp}`);
    } else {
      // Step 2: Create new OTP if no valid one exists
      otp = generateNumericOtp();
      const expiry = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes
  
      await OtpToken.create({
        memberId,
        phone: member.mobileNumber,
        userType: "member",
        purpose,
        otp,
        isUsed: false,
        expiresAt: expiry,
        created_by: member._id
      });
  
      console.log(`Generated new OTP: ${otp}`);
    }
  
    // Step 3: Send via WhatsApp (always)
    await sendOtpByWhatsapp(member.mobileNumber, otp);
    const maskedMobile = maskMobile(member.mobileNumber);
    const maskedName = maskName(member.fullName || "*****");
    return {
      status: HttpStatusCode.OK,
      message: "OTP sent to WhatsApp.",
      result: {
        name: maskedName,
        mobile: maskedMobile
      }
    };
  };
  
export const verifyOtp = async ({ memberId, otp }) => {
    if (!memberId || !otp) {
      throw new Error("Member ID and OTP are required.");
    }
  
    const record = await OtpToken.findOne({
      memberId,
      otp,
      isUsed: false,
      expiresAt: { $gte: new Date() },
    });
  
    if (!record) {
      throw new Error("Invalid or expired OTP.");
    }
  const member = await MemberData.findOne({ memberId });
  const member_id = member._id
    // Mark OTP as used and store verified timestamp
    record.isUsed = true;
    record.verifiedAt = new Date();
    await record.save();
  
    return {
      status: HttpStatusCode.OK,
      member_id:member_id,
      message: "OTP verified successfully.",
    };
  };
 
  export const resetPassword = async (userId, password) => {
 console.log(userId, password, "in resetPassword");
   let objectId = getObjectId(userId);
    console.log(objectId, userId, password, "at time of reset")
    let credentials = await MemberCredentials.findOne({ member_id: userId });
  
    if (!credentials) {
      // Create new credentials
      const member = await MemberData.findById(objectId);
      if (!member) throw new Error("Member not found.");
  
      const hashed = await bcrypt.hash(password, 10);
  
      credentials = new MemberCredentials({
        member_id: objectId,
        memberId: member.memberId,
        email: member.emailId,
        mobile: member.mobileNumber,
        password: hashed,
      });
  
      await credentials.save();
    } else {
      // Update existing credentials
      const hashed = await bcrypt.hash(password, 10);
      credentials.password = hashed;
      await credentials.save();
    }
  
    return {
      status: HttpStatusCode.OK,
      message: "Password reset successfully.",
    };
  };
  // Change password from profile
  export const changePassword = async (userId, { oldPassword, newPassword }) => {
console.log("Changing password for user:", userId, getObjectId(userId));
    const member = await MemberData.find({_id:getObjectId(userId)});
    console.log(member)
    if (!member || !member.password) {
      throw new Error("Member not found or password not set.");
    }
  
    const isMatch = await bcrypt.compare(oldPassword, member.password);
    if (!isMatch) throw new Error("Old password is incorrect.");
  
    const hashed = await bcrypt.hash(newPassword, 10);
    member.password = hashed;
    await member.save();
  
    return {
      status: HttpStatusCode.OK,
      message: "Password changed successfully."
    };
  };
  
  // Optional: Delete all expired or used OTPs (for cron job cleanup)
  export const cleanupExpiredOtps = async () => {
    await OtpToken.deleteMany({ expiresAt: { $lte: new Date() }, isUsed: true });
  };






  // // GENERATE OTP
// export const sendOtp = async ({ memberId }) => {
//     if (!memberId) throw new Error("Member ID is required.");

//     const member = await MemberData.findOne({ memberId });
//     if (!member) throw new Error("Member not found.");

//     const otp = generateNumericOTP(6);
//     const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

//     // Save to DB
//     await OtpToken.create({
//         memberId,
//         otp,
//         expiresAt: expiry
//     });

//     if (member.emailId) await sendOtpByMail(member.emailId, otp);
//     if (member.mobileNumber) await sendOtpByWhatsapp(member.mobileNumber, otp);

//     return {
//         status: HttpStatusCode.OK,
//         message: "OTP sent to email and WhatsApp."
//     };
// };

// // VERIFY OTP AND SET PASSWORD
// export const verifyOtpAndSetPassword = async ({ memberId, otp, newPassword }) => {
//     if (!memberId || !otp || !newPassword) {
//         throw new Error("All fields are required.");
//     }

//     const tokenDoc = await OtpToken.findOne({
//         memberId,
//         otp,
//         isUsed: false,
//         expiresAt: { $gte: new Date() }
//     });

//     if (!tokenDoc) {
//         throw new Error("Invalid or expired OTP.");
//     }

//     const hashed = await bcrypt.hash(newPassword, 10);
//     const updated = await MemberData.findOneAndUpdate(
//         { memberId },
//         { password: hashed },
//         { new: true }
//     );

//     if (!updated) throw new Error("Failed to update password.");

//     tokenDoc.isUsed = true;
//     await tokenDoc.save();

//     return {
//         status: HttpStatusCode.OK,
//         message: "Password set successfully. You can now login."
//     };
// };


// // CHANGE PASSWORD
// export const changePassword = async (userId, { oldPassword, newPassword }) => {
//     if (!oldPassword || !newPassword) {
//         throw new Error("Old and new password are required.");
//     }

//     const member = await MemberData.findById(userId);
//     if (!member || !member.password) {
//         throw new Error("Member not found or password not set.");
//     }

//     const isMatch = await bcrypt.compare(oldPassword, member.password);
//     if (!isMatch) throw new Error("Old password is incorrect.");

//     const hashed = await bcrypt.hash(newPassword, 10);
//     member.password = hashed;
//     await member.save();

//     return {
//         status: HttpStatusCode.OK,
//         message: "Password changed successfully."
//     };
// };

// // GET PROFILE
// export const getProfile = async (userId) => {
//     const member = await MemberData.findById(userId).select('-password');
//     if (!member) {
//         throw new Error("Member not found.");
//     }

//     return {
//         status: HttpStatusCode.OK,
//         message: "Profile fetched successfully.",
//         data: member
//     };
// };