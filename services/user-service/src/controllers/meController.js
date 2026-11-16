import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

const meController = async (req, res) =>{
        const user = await User.findById(req.user.userId).select("-password");
        if(!user){
            throw new AppError("User not found", 404);
        }
        res.status(200).json({
            success: true,
            user
        });
}

export default meController;