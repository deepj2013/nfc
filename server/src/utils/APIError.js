export class APIError extends Error {
    constructor(name, statusCode, isOperational, message) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}