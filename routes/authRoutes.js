import express from 'express';
import { authorizationCheck, forgotPassword, login, logout, resendOTP, resetPassword, signUp, verifyEmailViaLink, verifyEmailViaOtp } from '../controllers/authController.js';
import { isAuth } from '../utils/checkUserAuthorization.js'

const router = express.Router();

router.post('/signup', signUp);
router.post('/verify-user', verifyEmailViaOtp);
router.post('/verify-user/:token/:otp', verifyEmailViaLink);
router.post('/resend-otp', resendOTP)
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/authorization-check', isAuth , authorizationCheck);

export default router;