import User from "../models/users.model.js";

export const getuserdata = async (req, res) => {
    try {
        
        const userID = res.locals.userId; 
        const user = await User.findById(userID);

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({"message": "User data fetched successfully", "data": {
            username: user.username,
            isverified: user.isverified,
        }  });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}