import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, findUserById } from "../models/Auth.js";
import bcrypt from "bcryptjs";

export const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ data: null, message: "Invalid email format" });
    }

    // Check if email exists
    findUserByEmail(email, (err, existingUser) => {
        if (err) return res.status(500).json({ message: "Database error", error: err.message });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        // Create new user
        createUser(name, email, password, (err, newUser) => {
            if (err) return res.status(500).json({ message: "Error creating user", error: err.message });

            res.status(201).json({
                data: newUser,
                message: "User registered successfully"
            });
        });
    });
};

export const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ data: null, message: "Invalid email format" });
    }

    findUserByEmail(email, (err, user) => {
        if (err) return res.status(500).json({ message: "Database error", error: err.message });
        if (!user) return res.status(400).json({ message: "This user does not exist" });

        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: "Error comparing passwords" });
            if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

            // Generate JWT token
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Lax",
                maxAge: 3600000 // 1 hour
            });

            res.status(200).json({
                data: { id: user.id, name: user.name, email: user.email, role: user.role },
                message: "Login successful",
                token
            });
        });
    });
};

export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax"
    });

    res.status(200).json({ data: null, message: "Logged out successfully" });
};

export const getMe = (req, res) => {
    findUserById(req.user.id, (err, user) => {
        if (err) return res.status(500).json({ message: "Server error", error: err.message });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ data: user, message: "User retrieved successfully" });
    });
};

