import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    
    const secretKey = process.env.JWT_SECRET || "super#secret@jwtkey";
     
    return jwt.sign(
        { id: user._id, username: user.username }, 
        secretKey, 
        { expiresIn: "1d" }
    )
}