import * as memberService from '../services/memberUsingService.js';
import { HttpStatusCode } from '../utils/HttpStatusCode.js';
import { APIError } from '../utils/APIError.js';

export const generateInitialPassword = async (req, res, next) => {
    try {
        const response = await memberService.generateInitialPassword(req.body);
        res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
        next(new APIError("GENERATE_INITIAL_PASSWORD_FAILED", HttpStatusCode.BAD_REQUEST, true, error.message));
    }
};

export const memberLoginController = async (req, res, next) => {
    try {
        const response = await memberService.memberloginServics(req.body);
        res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
        next(new APIError("LOGIN_FAILED", HttpStatusCode.BAD_REQUEST, true, error.message));
    }
};

export const initiateOtp = async (req, res, next) => {
    try {
        const response = await memberService.sendOtp(req.body);
        res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
        next(new APIError("OTP_SEND_FAILED", HttpStatusCode.BAD_REQUEST, true, error.message));
    }
};

export const verifyOtpAndSetPassword = async (req, res, next) => {
    try {
        const response = await memberService.verifyOtp(req.body);
        res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
        next(new APIError("OTP_VERIFICATION_FAILED", HttpStatusCode.UNAUTHORIZED_REQUEST, true, error.message));
    }
};
export const resetPasswordcontroller = async (req, res, next) => {
    try {
 
  
      const { userId, password } = req.body;
  
      if (!userId || !password) {
        throw new Error("User ID and new password are required.");
      }
  
      const response = await memberService.resetPassword(userId, password);
      
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(new APIError("RESET_PASSWORD_FAILED", HttpStatusCode.BAD_REQUEST, true, error.message));
    }
  };

export const changePassword = async (req, res, next) => {
    try {
        console.log(req.body, "req.body in changePassword");
        const userId = req.body.userId || req.user._id;
        const password= req.body.password // Use userId from request body or authenticated user
        const response = await memberService.changePassword(userId, password);
  
        res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
        next(new APIError("CHANGE_PASSWORD_FAILED", HttpStatusCode.BAD_REQUEST, true, error.message));
    }
};

export const getMemberProfile = async (req, res, next) => {
    try {
        const response = await memberService.getProfile(req.body.userId);
        res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
        next(new APIError("FETCH_PROFILE_FAILED", HttpStatusCode.NOT_FOUND, true, error.message));
    }
};