// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// const authMiddleware = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({
//                 success: false, 
//                 message: "Access denied. No token provided."
//             });
//         }

//         const token = authHeader.split(" ")[1];

//         const decoded = jwt.verify(
//             token, 
//             process.env.ACCESS_SECRET
//         )

//         const user = await User.findById(decoded.id).select("-password -refreshToken");
        
//         if (!user) {
//             return res.status(401).json({
//                 success: false, 
//                 message: "User not found."
//             })
//         }

//         req.user = user;

//         next();
//     } catch (error) {
//         return res.status(401).json({
//             success: false, 
//             message: "Invalid or expired access token."
//         })
//     }
// };

// export default authMiddleware;



import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        console.log("AUTH HEADER:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("TOKEN RECEIVED:", !!token);

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_SECRET
        );

        console.log("DECODED TOKEN:", decoded);

        const user = await User.findById(decoded.id)
            .select("-password -refreshToken");

        console.log("USER FOUND:", !!user);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        req.user = user;

        next();

    } catch (error) {

        console.error("AUTH ERROR:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token.",
        });
    }
};

export default authMiddleware;