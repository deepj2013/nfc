import jwt from "jsonwebtoken"
import APIError, { HttpStatusCode } from "../exception/errorHandler.js";
import { getObjectId } from "../helpers/mongoose/mongooseHelpers.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers['x-auth-token'];
        if (!token) {
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'Unauthorized Token');
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (new Date().getTime() > verify.tokenExpiryTime) {
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'Token has been expired. Kindly Relogin!');
        }
        const userId = getObjectId(verify.userId)
        req.body.userId = userId
        next();
    } catch (error) {
        console.log(error);
        next(error)
    }
}

