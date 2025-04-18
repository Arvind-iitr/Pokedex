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
        type: Date,
        default : null
    },
    resetpassotp : {
        type: String,
        default : null
    }
    ,
    resetpassValidity : {
        type: Date,
        default : null
    }
})


const User = mongoose.model('User', userSchema);

export default User;