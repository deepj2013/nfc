import APIError, { HttpStatusCode } from "../exception/errorHandler.js"
import { comparePassword, encryptPassword } from "../helpers/passwordEncryption/passwordEncryption.js"
import {getTokenOfUserService, generateTokenService} from "../services/authServices.js"
import UniversalAdmin from "../models/universalAdminModel.js"
import User from "../models/userModel.js"

export const createUserService = async (userData) => {
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

export const userLoginService = async (email_id, password) => {
    try {
        const user = await User.findOne({ email_id: email_id.toLowerCase() });
     
        if (!user) {
            throw new APIError('AuthenticationError', HttpStatusCode.UNAUTHORIZED, true, 'Invalid email or password.');
        }

        // Check if account is locked
        if (user.account_locked) {
            throw new APIError('AuthenticationError', HttpStatusCode.UNAUTHORIZED, true, 'Account is locked due to multiple invalid login attempts.');
        }

        // Validate password
        const isPasswordValid = await comparePassword(password, user.password);
        
        if (!isPasswordValid) {
            user.invalid_attempts += 1;
            if (user.invalid_attempts >= 5) {
                user.account_locked = true;
            }
            await user.save();
            throw new APIError('AuthenticationError', HttpStatusCode.UNAUTHORIZED, true, 'Invalid email or password.');
        }

        // Reset invalid attempts and update is_logged_in status
        user.invalid_attempts = 0;
        user.is_logged_in = true;
        user.last_logged_in_out = new Date();
        await user.save();

        let tokenObj = await getTokenOfUserService(user._id)

        if (tokenObj == null || new Date().getTime() > tokenObj.expiresAt) {
            await generateTokenService(user._id)
            // getting Token of User
            tokenObj = await getTokenOfUserService(user._id)
        }

        return {
            token: tokenObj.token,
            expiresAt: tokenObj.expiresAt,
            userName: user.user_name,
            roleId: user.role_id
        }
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
};