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

export const memberLogin = async (req, res, next) => {
    try {
        const response = await memberService.login(req.body);
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
        const response = await memberService.verifyOtpAndSetPassword(req.body);
        res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
        next(new APIError("OTP_VERIFICATION_FAILED", HttpStatusCode.UNAUTHORIZED_REQUEST, true, error.message));
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const response = await memberService.changePassword(req.body.userId, req.body);
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