import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is required!"], 
        trim: true, 
        lowercase: true, 
        minlength: [3, "Username must be at least 3 characters long"], 
        maxlength: [30, "Username cannot exceed 30 characters"], 
        index: true
    }, 
    phone: {
        type: String, 
        required: [true, "Phone number is required!"], 
        unique: true, 
        trim: true, 
        match: [/^\+[1-9]\d{1,14}$/, "Please fill a phone number"]
    },
    email: {
        type: String, 
        required: [true, "Email is required!"], 
        unique: true, 
        trim: true, 
        lowercase: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address!"]
    }, 
    password: {
        type: String, 
        required: [true, "Password is required!"],
        minlength: [8, "Password must be at least 8 characters long!"]
    }, 
    refreshToken: {
        type: String, 
        default: null
    }, 
    isVerified: {
        type: Boolean, 
        default: false
    }, 
    otp: { 
        type: String, 
        default: null
    }, 
    otpExpires: { 
        type: Date, 
        default: null
    }
}, { timestamps: true} )

const User = new mongoose.model("User", userSchema);

export default User;