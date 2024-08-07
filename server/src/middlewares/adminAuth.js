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
        if (verify.userId.toString() !== '66b2149c6c62032b23fa6217') {
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'This token does not belong to admin!');
        }
        next()
    } catch (error) {
        next(error)
    }
}

