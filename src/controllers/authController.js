import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserByEmail, createUser, findUserById } from "../models/Auth.js";

// User Registration
export const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            data: null,
            message: "Invalid email format",
            error: "Email format does not match"
        });
    }

    findUserByEmail(email, (err, existingUser) => {
        if (err) {
            return res.status(500).json({
                data: null,
                message: "Database error",
                error: err.message
            });
        }

        if (existingUser) {
            return res.status(400).json({
                data: null,
                message: "Email already in use",
                error: "Duplicate email"
            });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({
                    data: null,
                    message: "Error hashing password",
                    error: err.message
                });
            }

            createUser(name, email, hashedPassword, (err, newUser) => {
                if (err) {
                    return res.status(500).json({
                        data: null,
                        message: "Error creating user",
                        error: err.message
                    });
                }

                res.status(201).json({
                    data: newUser,
                    message: "User registered successfully",
                    error: null
                });
            });
        });
    });
};

// User Login
export const loginUser = (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            data: null,
            message: "Invalid email format",
            error: "Email format is incorrect"
        });
    }

    findUserByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).json({
                data: null,
                message: "Database error",
                error: err.message
            });
        }

        if (!user) {
            return res.status(400).json({
                data: null,
                message: "User does not exist",
                error: "No user found with this email"
            });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({
                    data: null,
                    message: "Error comparing passwords",
                    error: err.message
                });
            }

            if (!isMatch) {
                return res.status(400).json({
                    data: null,
                    message: "Incorrect password",
                    error: "Password mismatch"
                });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Lax",
                maxAge: 3600000
            });

            res.status(200).json({
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                message: "Login successful",
                error: null,
                token
            });
        });
    });
};

// Logout User
export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax"
    });

    res.status(200).json({
        data: null,
        message: "Logged out successfully",
        error: null
    });
};

// Get Current User
export const getMe = (req, res) => {
    findUserById(req.user.id, (err, user) => {
        if (err) {
            return res.status(500).json({
                data: null,
                message: "Server error",
                error: err.message
            });
        }

        if (!user) {
            return res.status(404).json({
                data: null,
                message: "User not found",
                error: "No user with given ID"
            });
        }

        res.status(200).json({
            data: user,
            message: "User retrieved successfully",
            error: null
        });
    });
};
