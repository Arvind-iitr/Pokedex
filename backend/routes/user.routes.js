import express from 'express';
import { getuserdata, updateInfo } from '../controllers/user.controller.js';
import { userAuthenticate } from '../middleware/auth.middleware.js';
import { updateProfile } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/get-data', userAuthenticate, getuserdata)

userRouter.put('/update-profile', userAuthenticate, updateProfile)

userRouter.put('/update-info' , userAuthenticate, updateInfo)

export default userRouter;  


