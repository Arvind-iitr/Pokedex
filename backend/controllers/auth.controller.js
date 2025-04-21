import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/users.model.js";
import {
  generateOTPEmail,
  generateResetPasswordEmail,
  transporter,
} from "../utils/nodemailer.js";
import { generateWelcomeEmail } from "../utils/nodemailer.js";

//signup route to save new user, gen token and send welcome email
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10); // Hash the password before storing it

    const user = await User.findOne({ email }); //check if user already exists
    if (user) return res.json({ success : false , message: "Email already exists" }); //user already exists

    // Save the user to the database
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: "3d",
    }); // Generate a JWT token for the user using id and expiration time of 3 days

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.MODE === "production", // Set secure flag to true when running in production mode
      sameSite: process.env.MODE === "production" ? "none" : "strict", // Set SameSite to 'none' when running in production mode or 'strict' when running in development mode
      maxAge: 3 * 24 * 60 * 60 * 1000, // Expire in 3 days
    });

    const emailObject = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to our Pokedex!",
      html: generateWelcomeEmail(username), //define the email content with the username
    };

    await transporter.sendMail(emailObject); //sending the email via nodemailer

    res.json({ success: true , message: "User created successfully" });
  } catch (error) {
    res.json({success:false , message: error.message });
  }
};

//login route to authenticate user and gen token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); //find the user in database

    if (!user) {
      return res.json({succces: false, message: "User not found" });
    }
   

    const isPasswordMatch = await bcrypt.compare(password, user.password); // compare the hashed password with the password

    if (!isPasswordMatch) {
      return res.json({ succces:false , message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "3d",
    }); // Generate a JWT token for the user using id and expiration time of 3 days

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.MODE === "production", // Set secure flag to true when running in production mode
      sameSite: process.env.MODE === "production" ? "none" : "strict", // Set SameSite to 'none' when running in production mode or 'strict' when running in development mode
      maxAge: 3 * 24 * 60 * 60 * 1000, // Expire in 3 days
    });

    res.json({success:true, message: "User logged in successfully" });
  } catch (error) {
    res.json({succces: false, message: error.message });
  }
};

//signout route to clear the token
export const signout = async (req, res) => {
  res.clearCookie("token", { path: "/" }); //clear the token from the response cookie
  res.json({succces:true, message: "User signed out successfully" });
};

//send otp route to send otp to user's registered email
export const sendOtp = async (req, res) => {
  try {
    // const { userID } = req.body;
    const userID = res.locals.userId;
    const user = await User.findById(userID);

    if (user.isverified) {
      res.json({succces:false, message: "User is already verified" }); //already verified user
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); //generate a random 6-digit otp
    user.otp = otp;
    user.otpValidity = Date.now() + 30 * 60 * 1000; //set otp validity to 30 minutes

    await user.save();

    const emailObject = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Verification Code",
      html: generateOTPEmail(user.username, otp),
    };

    await transporter.sendMail(emailObject);

    res.status(200).json({ success:true , message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({succces:false, message: error.message });
  }
};

//verify otp route to verify the otp sent to user's registered email
export const verifyOtp = async (req, res) => {
  try {
    // const { userID, otp } = req.body;
    const userID = res.locals.userId;
    const otp = req.body.otp;

    const user = await User.findById(userID);

    if (!user) {
      res.json({success:false, message: "User not found" });
    }

    if (user.otpValidity < Date.now()) {
      res.json({succces:false, message: "OTP expired" }); //otp expired
    }

    if (user.otp === otp) {
      user.isverified = true;
      user.otp = null;
      user.otpValidity = null;
      await user.save();
      
      res.json({success:true, message: "OTP verified successfully" });
    } else {
      res.json({ success:false, message: "Invalid OTP" }); //invalid otp
    }
  } catch (error) {
    res.json({success:false, message: error.message });
  }
};

//a lightweight route to check if user is authenticated
export const isAuth = async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    res.json({success:false,  message: error.message });
  }
};

//send password reset otp
export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" }); //user not found
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString(); //generate a random 6-digit otp
    user.resetOtp = otp;
    user.resetOtpValidity = Date.now() + 30 * 60 * 1000; //set otp validity to 10 minutes
    await user.save();

    const emailObject = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Reset Password Code",
      html: generateResetPasswordEmail(user.username, otp),
    };

    await transporter.sendMail(emailObject); //send the email for resetting password

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" }); //user not found
    }

    if (user.resetOtpValidity < Date.now()) {
      res.status(400).json({ message: "OTP expired" }); //otp expired
    }

    if (user.resetOtp === otp) {
      const hashedPassword = await bcrypt.hash(newPassword, 10); //hash the new password
      user.password = hashedPassword;
      user.resetOtp = null;
      user.resetOtpValidity = null;
      await user.save();
      res.status(200).json({ message: "Password reset successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" }); //invalid otp
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


