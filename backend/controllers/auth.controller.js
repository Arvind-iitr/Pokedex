import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/users.model.js"
import { transporter } from '../utils/nodemailer.js';
import { generateWelcomeEmail } from '../utils/nodemailer.js';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const hashPassword = await bcrypt.hash(password, 10); // Hash the password before storing it

        // Save the user to the database
        const newUser = new User({ username, email, password: hashPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: '3d' }); // Generate a JWT token for the user using id and expiration time of 3 days

        res.cookie('token' , token , {
            httpOnly: true,
            secure: process.env.MODE === 'production', // Set secure flag to true when running in production mode
            sameSite: process.env.MODE === 'production'? 'none' : 'strict', // Set SameSite to 'none' when running in production mode or 'strict' when running in development mode
            maxAge: 3 * 24 * 60 * 60 * 1000, // Expire in 3 days
            
        })

        const emailObject  = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Welcome to our Pokedex!',
            html : generateWelcomeEmail(username)
        }

        await transporter.sendMail(emailObject)

        res.status(201).json({ message: 'User created successfully'  });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


