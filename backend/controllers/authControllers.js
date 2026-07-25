import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../config/generateToken.js";
import { sendOTP } from "../services/emailService.js";
import crypto from "crypto";

/**
 * @POST Route
 * @signup controller
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
 * @POST Route
 * @login controller
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

const authController = {
    signup,
    login
};

export default authController;