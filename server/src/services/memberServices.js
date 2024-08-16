import APIError, { HttpStatusCode } from "../exception/errorHandler.js"
import { comparePassword, encryptPassword } from "../helpers/passwordEncryption/passwordEncryption.js"
import {getTokenOfUserService, generateTokenService} from "../services/authServices.js"

import User from "../models/userModel.js"

export const createMemberService = async (userData) => {
    try {
        // Hashing Password
        userData.password = await encryptPassword(userData.password);
        // Fetch the last user to determine the next user ID
        const lastUser = await User.findOne().sort({ user_id: -1 }).exec();
        userData.user_id = lastUser ? lastUser.user_id + 1 : 1;
        // Creating new user object
        const newUser = new User(userData);
        // Save the new user to the database
        await newUser.save();
        // Resolve Promise
        return Promise.resolve(newUser);
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
};