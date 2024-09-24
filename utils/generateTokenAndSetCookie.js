import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, user) => {
    const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: `30d` });
    res.cookie( "token", token, { 
        httpOnly: true, 
        sameSite: "none",  // Set to "none" if your site requires cross-site access
        secure: process.env.NODE_ENV === "production",  // Set to true if your site requires HTTPS
        maxAge: 24 * 60 * 60 * 1000 * 30   // 30 days
    });
        
    return token;

}

export default generateTokenAndSetCookie;