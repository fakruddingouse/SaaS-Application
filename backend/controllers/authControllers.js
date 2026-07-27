import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../config/generateToken.js";
import { sendOTP } from "../services/emailService.js";

/**
 * @Name signup 
 * @Description signup a new user, gets OTP
 * @Post Route
 */

const signup = async (req, res) => {
    try {
        const { username, phone, email, password } = req.body;

        if (!username || !phone || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, phone, email and password are required!"
            });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists!"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        const otp = crypto.randomInt(100000, 1000000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const newUser = await User.create({
            username,
            phone,
            email,
            password: hashedPwd, 
            otp, 
            otpExpires, 
            isVerified: false
        });

        await sendOTP(email, otp);

        res.status(201).json({
            success: true,
            message: "OTP sent successfully. Please verify your email.",
            email: newUser.email
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @Verify OTP
 * @description verifies OTP
 */
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required!"
            });
        }
        const user = await User.findOne({ email });
    
        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User not found!"
            })
        } 

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified."
            });
        }

        if (!user.otp || !user.otpExpires) {
            return res.status(400).json({
                success: false, 
                message: "No OTP found. Please request a new one."
            })
        } 
        
        if (user.otpExpires <= new Date()) {
            return res.status(400).json({
                success: false, 
                message: "OTP has expired!"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false, 
                message: "Invalid OTP!"
            })
        }
        
        user.isVerified = true;

        user.otp = null;
        user.otpExpires = null;

        await user.save();

        return res.status(200).json({
            success: true, 
            message: "Email verified successfully!"
        }) 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


/**
 * @Name resendOTP
 * @Description resends otp if the previous one expires
 * @Post Route
 */
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(404).json({
                success: false, 
                message: "Email is required!"
            })
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User not found!"
            })
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false, 
                message: "Email is already verified!"
            })
        }

        const newOtp = crypto.randomInt(10000, 1000000).toString();
        const newOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = newOtp;
        user.otpExpires = newOtpExpires;

        await user.save({ validationBeforeSave: false });
        await sendOTP(user.email, newOtp);

        return res.status(200).json({
            success: true, 
            message: "OTP resent successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}


/**
 * @POST Route
 * @login controller
 * @description generates refresh and access tokens
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required!"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!"
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                success: false, 
                message: "Please verify your email before logging in!"
            })
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            message: "Logged in successfully!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @RefreshAccessToken
 */
const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token not found."
            })
        }
        
        const decoded = jwt.verify(
            refreshToken, 
            process.env.REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User not found!"
            })
        }

        if (user.refreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token."
            });
        }

        const newAccessToken = generateAccessToken(user);

        return res.status(200).json({
            success: true, 
            accessToken: newAccessToken
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token."
        });
    }
}

/**
 * @Logout
 */
const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(200).json({
                success: true, 
                message: "Logged out successfully!"
            }) 
        }

        const user = await User.findOne({ refreshToken });
        if (user) {
            user.refreshToken = null;
            await user.save({ validateBeforeSave: false });
        }

        res.clearCookie("refreshToken", {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict"
        })

        return res.status(200).json({
            success: true,
            message: "Logged out successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const authController = {
    signup, 
    verifyOTP, 
    resendOTP, 
    login, 
    refreshAccessToken, 
    logout
};

export default authController;