import { MemberData } from '../models/member_Model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../utils/HttpStatusCode.js';
import { APIError } from '../utils/APIError.js';
import { sendOtpByMail, sendOtpByWhatsapp } from '../helpers/otpHelper.js'; // you'll define these
import { generateNumericOTP } from '../helpers/commonHelper.js';
import OtpToken from '../models/otpModel.js'
import MemberCredentials from '../models/member_credentials.js';

const otpCache = {}; // In-memory OTP store (you can later replace with Redis)

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

export const verifyOtpAndCreatePassword = async ({ memberId, otp, newPassword }) => {
    if (!memberId || !otp || !newPassword) {
        throw new Error("All fields (memberId, otp, newPassword) are required.");
    }

    const member = await MemberData.findOne({ memberId });
    if (!member) throw new Error("Member not found.");

    const existingCreds = await MemberCredentials.findOne({ memberId });
    if (existingCreds) throw new Error("Password already exists. Use forgot password.");

    const otpDoc = await OtpToken.findOne({
        memberId,
        otp,
        isUsed: false,
        expiresAt: { $gte: new Date() }
    });

    if (!otpDoc) throw new Error("Invalid or expired OTP.");

    const hashed = await bcrypt.hash(newPassword, 10);

    await MemberCredentials.create({
        member_id: member._id,
        memberId,
        email: member.emailId,
        mobile: member.mobileNumber,
        password: hashed,
        invalidLoginAttempts: 0
    });

    otpDoc.isUsed = true;
    await otpDoc.save();

    return {
        status: 200,
        message: "Password created successfully. You can now login."
    };
};
// LOGIN
export const login = async ({ memberId, password }) => {
    if (!memberId || !password) {
        throw new Error("Member ID and Password are required.");
    }

    const member = await MemberData.findOne({ memberId });
    if (!member) {
        throw new Error("Invalid Member ID.");
    }

    if (!member.password) {
        throw new Error("No password found. Please generate your password first.");
    }

    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
        throw new Error("Incorrect password.");
    }

    const token = jwt.sign(
        { userId: member._id, memberId: member.memberId },
        process.env.JWT_SECRET_KEY
    );

    return {
        status: HttpStatusCode.OK,
        message: "Login successful.",
        token,
        memberId: member.memberId,
        name: `${member.firstName} ${member.surname}`
    };
};

// GENERATE OTP
export const sendOtp = async ({ memberId }) => {
    if (!memberId) throw new Error("Member ID is required.");

    const member = await MemberData.findOne({ memberId });
    if (!member) throw new Error("Member not found.");

    const otp = generateNumericOTP(6);
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // Save to DB
    await OtpToken.create({
        memberId,
        otp,
        expiresAt: expiry
    });

    if (member.emailId) await sendOtpByMail(member.emailId, otp);
    if (member.mobileNumber) await sendOtpByWhatsapp(member.mobileNumber, otp);

    return {
        status: HttpStatusCode.OK,
        message: "OTP sent to email and WhatsApp."
    };
};

// VERIFY OTP AND SET PASSWORD
export const verifyOtpAndSetPassword = async ({ memberId, otp, newPassword }) => {
    if (!memberId || !otp || !newPassword) {
        throw new Error("All fields are required.");
    }

    const tokenDoc = await OtpToken.findOne({
        memberId,
        otp,
        isUsed: false,
        expiresAt: { $gte: new Date() }
    });

    if (!tokenDoc) {
        throw new Error("Invalid or expired OTP.");
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    const updated = await MemberData.findOneAndUpdate(
        { memberId },
        { password: hashed },
        { new: true }
    );

    if (!updated) throw new Error("Failed to update password.");

    tokenDoc.isUsed = true;
    await tokenDoc.save();

    return {
        status: HttpStatusCode.OK,
        message: "Password set successfully. You can now login."
    };
};


// CHANGE PASSWORD
export const changePassword = async (userId, { oldPassword, newPassword }) => {
    if (!oldPassword || !newPassword) {
        throw new Error("Old and new password are required.");
    }

    const member = await MemberData.findById(userId);
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

// GET PROFILE
export const getProfile = async (userId) => {
    const member = await MemberData.findById(userId).select('-password');
    if (!member) {
        throw new Error("Member not found.");
    }

    return {
        status: HttpStatusCode.OK,
        message: "Profile fetched successfully.",
        data: member
    };
};