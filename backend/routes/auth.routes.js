import express from 'express';
import {isAuth, login, resetPassword, sendOtp, sendResetOtp, signout, signup, verifyOtp} from '../controllers/auth.controller.js';
import { userAuthenticate } from '../middleware/auth.middleware.js';


const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/signout", signout);
authRouter.post("/send-otp" , userAuthenticate, sendOtp); //using the authenticate middleware to protect these route
authRouter.post("/verify-otp", userAuthenticate,  verifyOtp);
authRouter.get("/isauth", userAuthenticate, isAuth); 
authRouter.post("/send-reset-otp", sendResetOtp); 
authRouter.post("/reset-password", resetPassword); 



export default authRouter;