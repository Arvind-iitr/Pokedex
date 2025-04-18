import express from 'express';
import {login, sendOtp, signout, signup, verifyOtp} from '../controllers/auth.controller.js';
import { userAuthenticate } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/signout", signout);
router.post("/sendOtp" , userAuthenticate, sendOtp); //using the authenticate middleware to protect these route
router.post("/verifyOtp", userAuthenticate,  verifyOtp);

export default router;