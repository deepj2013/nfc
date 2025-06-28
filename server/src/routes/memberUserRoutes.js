import express from 'express';
import {
  memberLoginController,
  initiateOtp,
  verifyOtpAndSetPassword,
  changePassword,
  getMemberProfile,
  generateInitialPassword,
  resetPasswordcontroller,
} from '../controllers/memberUsingController.js';
import { memberAuth } from '../middlewares/auth.js';


const router = express.Router();

router.post('/generate-initial-password', generateInitialPassword); // New route
// Login with Password
router.post('/login', memberLoginController);
// OTP generation for setting password first time
router.post('/generate-otp', initiateOtp);
// Verify OTP and Set Password
router.post('/verify-otp', verifyOtpAndSetPassword);
// Change Password (after login)
router.post('/reset-password', resetPasswordcontroller
);
router.post('/change-password', memberAuth, changePassword);
// Dashboard / Profile Info
router.get('/profile', memberAuth, getMemberProfile);

export default router;