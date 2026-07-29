import transporter from "../config/mailConfig.js";

export const sendOTP = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            html: `
                <h2>Email Verification</h2>
    
                <p>Your OTP is:</p>
    
                <h1>${otp}</h1>
    
                <p>This OTP is valid for 10 minutes.</p>
    
                <p>If you didn't request this, please ignore this email.</p>
            `
        });
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw new Error("Failed to send verification email.");
    }
};

// Email to request reset the password
export const forgotPasswordOTP = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset Password Request",
            html: `
                <h2>Reset your password and create a new one! Your data is safe!</h2>
    
                <p>Your OTP to reset your password is:</p>
    
                <h1>${otp}</h1>
    
                <p>This OTP is valid for 10 minutes.</p>
    
                <p>If you didn't request this, please ignore this email.</p>
            `
        });
    } catch (error) {
        console.error("Error sending reset password OTP email:", error);
        throw new Error("Failed to send reset password email.");
    }
}