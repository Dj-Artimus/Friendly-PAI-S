import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const isAuth = async (req,res,next) => {

    const token = req.cookies.token || req.body.token ;

    if (!token) return res.status(403).json({success: false , message: "Session Expired, Please login."});

    const userId = jwt.verify(token, process.env.JWT_SECRET).user;
    
    if (!userId) return res.status(403).json({success: false , message: "Unexpected error to get the User, Please login."});

    const user = await User.findById(userId);

    if (!user) return res.status(403).json({success: false , message: "User not found"});

    req.user = user;
    
    next();

}