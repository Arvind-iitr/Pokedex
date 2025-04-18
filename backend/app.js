import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

import router from './routes/auth.routes.js'; // Import user routes

const app = express();

dotenv.config(); // Load environment variables from.env file

const port = process.env.PORT || 3000;

connectDB(); // Connect to MongoDB database

app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello,this is our homepage!');
})

// Import routes
app.use('/api/users', router);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})