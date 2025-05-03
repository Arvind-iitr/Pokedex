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
  
      const user = await User.findById(userID).select(
        "-password -otp -otpValidity -resetOtp -resetOtpValidity"
      );
  
      if (!user) {
        return res.json({ success: false, message: 'User not found' });
      }
  
      res.json({
        success: true,
        message: "User data fetched successfully",
        userdata: user, // full user object minus password
      });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };

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


export const updateInfo = async (req, res) => {
    try {
        const userID = res.locals.userId;
        const {height , weight , gender , hometown , trainerType , favPokemon , age} = req.body;

        const user =  await User.findByIdAndUpdate(userID, { height, weight, gender, hometown, trainerType, favPokemon, age }, { new: true });
      
        res.json({ success: true, message: 'User information updated successfully', user });
      
      }catch (error) {
        res.json({ success: false, message: error.message });
        console.log("Error in updateInfo:", error);
      }  
}