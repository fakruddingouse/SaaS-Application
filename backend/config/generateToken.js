import jwt from "jsonwebtoken";

// Access token
export const generateAccessToken = (user) => {
    
    const secretKey = process.env.ACCESS_SECRET;
     
    return jwt.sign(
        { id: user._id }, 
        secretKey, 
        { expiresIn: "15m" }
    )
}

// Refresh token
export const generateRefreshToken = (user) => {
    
    const secretKey = process.env.REFRESH_SECRET;
     
    return jwt.sign(
        { id: user._id }, 
        secretKey, 
        { expiresIn: "7d" }
    )
}