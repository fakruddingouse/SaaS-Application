import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/generateToken.js";

/**
 * @POST Route
 * @signup controller
 */
const signup = async (req, res) => {
    try {
        const { username, phone, email, password } = req.body;

        if (!username || !phone || !email || !password) {
            return res.status(400).json({
                message: "Username, phone, email and password are required!"
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists!"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        const user = await User.create({
            username, phone, email, password: hashedPwd
        })

        res.status(201).json({
            message: "User created successfully!"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @POST Route
 * @login controller
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required!"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials!"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials!"
            })
        }

        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const authController =  { 
    signup, 
    login 
};

export default authController;