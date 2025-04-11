import {
    getAllUsers,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
  } from "../models/user.js";
  
  // Get all users
  export const getUsers = (req, res) => {
    getAllUsers((err, users) => {
      if (err) {
        return res.status(500).json({
          data: null,
          message: "Error fetching users",
          error: err.message,
        });
      }
  
      res.status(200).json({
        data: users,
        message: "Users retrieved successfully",
        error: null,
      });
    });
  };
  
  // Get user by email (for login)
  export const getUser = (req, res) => {
    const { email } = req.params;
  
    getUserByEmail(email, (err, user) => {
      if (err) {
        return res.status(404).json({
          data: null,
          message: "User not found",
          error: err,
        });
      }
  
      res.status(200).json({
        data: user,
        message: "User found",
        error: null,
      });
    });
  };
  
  // Create new user
  export const createUserHandler = (req, res) => {
    const { name, email, password, role } = req.body;
  
    createUser({ name, email, password, role }, (err, newUser) => {
      if (err) {
        return res.status(500).json({
          data: null,
          message: "Error creating user",
          error: err.message,
        });
      }
  
      res.status(201).json({
        data: newUser,
        message: "User registered successfully",
        error: null,
      });
    });
  };
  
  // Update user
  export const updateUserHandler = (req, res) => {
    const { id } = req.params;
    const { name, role } = req.body;
  
    updateUser(id, name, role, (err, result) => {
      if (err) {
        return res.status(500).json({
          data: null,
          message: "Error updating user",
          error: err.message,
        });
      }
  
      res.status(200).json({
        data: result,
        message: "User updated successfully",
        error: null,
      });
    });
  };
  
  // Delete user
  export const deleteUserHandler = (req, res) => {
    const { id } = req.params;
  
    deleteUser(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          data: null,
          message: "Error deleting user",
          error: err.message,
        });
      }
  
      res.status(200).json({
        data: result,
        message: "User deleted successfully",
        error: null,
      });
    });
  };
  