import { auth } from './auth.js';
import { adminAuth } from './adminAuth.js';

export const eitherAuthOrAdmin = async (req, res, next) => {
    try {
        // First, attempt to authenticate with `auth` middleware for regular users
        await auth(req, res, (err) => {
            if (!err) {
                return next(); // If `auth` passes, continue to the next middleware/controller
            }

            // If `auth` fails, try `adminAuth` for admin users
            adminAuth(req, res, (err) => {
                if (!err) {
                    return next(); // If `adminAuth` passes, continue to the next middleware/controller
                }

                // If both `auth` and `adminAuth` fail, return an unauthorized error
                return res.status(401).json({ error: 'Unauthorized access. You must be logged in or an admin.' });
            });
        });
    } catch (error) {
        // Catch any errors that might occur during auth or adminAuth middleware
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
