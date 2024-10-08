import jwt from "jsonwebtoken"
import APIError, { HttpStatusCode } from "../exception/errorHandler.js";

export const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers['x-auth-token'];
        if (!token) {
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'Unauthorized Token');
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (new Date().getTime() > verify.tokenExpiryTime) {
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'Token has been expired. Kindly Relogin!');
        }
        if (verify.userId.toString() !== '66ebcc095bc3dbbb4ea19ed0' && verify.userId.toString() !== '66c086c9b431f22d2e885a88') {
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'This token does not belong to admin!');
        }
        next()
    } catch (error) {
        next(error)
    }
}

