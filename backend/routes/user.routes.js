import express from 'express';
import { getuserdata } from '../controllers/user.controller.js';
import { userAuthenticate } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/get-data', userAuthenticate, getuserdata)

export default userRouter;