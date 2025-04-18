import express from 'express';
import {isAuth, login, resetPassword, sendOtp, sendResetOtp, signout, signup, verifyOtp} from '../controllers/auth.controller.js';
import { userAuthenticate } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/signout", signout);
router.post("/send-otp" , userAuthenticate, sendOtp); //using the authenticate middleware to protect these route
router.post("/verify-otp", userAuthenticate,  verifyOtp);
router.post("/isauth", userAuthenticate, isAuth); 
router.post("/send-reset-otp", sendResetOtp); 
router.post("/reset-password", resetPassword); 

export default router;