import mongoose from'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
        
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isverified: {
        type: Boolean,
        default: false
    }
    ,
    otp : {
        type: String,
        default : null
    },
    otpValidity : {
        type: Number,
        default : null
    },
    resetOtp : {
        type: String,
        default : null
    }
    ,
    resetOtpValidity : {
        type: Number,
        default : null
    }
})


const User = mongoose.model('User', userSchema);

export default User;