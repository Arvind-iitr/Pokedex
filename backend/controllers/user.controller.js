import User from "../models/users.model.js";
import cloudinary from "../utils/cloudinary.js";


// export const getuserdata = async (req, res) => {
//     try {
        
//         const userID = res.locals.userId; 
//         const user = await User.findById(userID);

//         if (!user) return res.json({ success :false , message: 'User not found' });

//         res.json({success: true , message: "User data fetched successfully", userdata : {
//             username: user.username,
//             isverified: user.isverified,
//         }  });
//     } catch (error) {
//         res.json({success:false, message: error.message });
//     }
// }


export const getuserdata = async (req, res) => {
    try {
        const userID = res.locals.userId;
        // console.log("UserID from res.locals:", userID);

        const user = await User.findById(userID);
        // console.log("User found:", user);

        if (!user) {
            // console.log("User not found");
            return res.json({ success: false, message: 'User not found' });
        }

        const userData = {
            username: user.username,
            isverified: user.isverified,
            profilePic: user.profilePic,
        };
        // console.log("User data being sent:", userData);

        res.json({
            success: true,
            message: "User data fetched successfully",
            userdata: userData
        });
    } catch (error) {
        // console.error("Error in getuserdata:", error);
        res.json({ success: false, message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userID = res.locals.userId;
        const {profilePic} = req.body;

        if (!profilePic) {
            return res.json({ success: false, message: 'Profile picture is required' });
        }

        const uploadRes = await cloudinary.uploader.upload(profilePic);

        await User.findByIdAndUpdate(userID, { profilePic: uploadRes.secure_url });

        res.json({ success: true, message: 'Profile picture updated successfully', profilePic: uploadRes.secure_url });
    }
    catch (error) {
    
        res.json({ success: false, message: error.message });
        console.log("Error in updateProfile:", error);
    }
}