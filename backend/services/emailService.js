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