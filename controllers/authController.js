const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body;

        if (!userName || !email || !password || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            phone,
            address,
        });

        // ✅ Send response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }
        user.password = undefined;
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user,
        });


    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    register,
    login,
};
