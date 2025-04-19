import {
  getAllUsers,
  deleteUserById,
  hasPendingOrders,
  hasUserReviews,
  updateUserById,
  getUserById,
  createUser
} from "../models/user.js";

// Get all users
export const getUsers = (req, res) => {
  getAllUsers((err, users) => {
      if (err) {
          return res.status(500).json({
              data: null,
              message: "Users cannot be displayed",
              error: err.message
          });
      }
      res.status(200).json({
          data: users,
          message: "Users retrieved successfully"
      });
  });
};

// Create a user
export const addUser = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
      return res.status(400).json({
          message: "All fields are required",
          data: null
      });
  }

  createUser({ name, email, password, role }, (err, result) => {
      if (err) {
          return res.status(500).json({
              message: "Error creating user",
              error: err.message,
              data: null
          });
      }
      res.status(201).json({
          message: "User created successfully",
          data: { id: result.insertId, name, email, role }
      });
  });
};

// Delete a user
export const deleteUser = (req, res) => {
  const { id } = req.params;

  hasPendingOrders(id, (err, hasOrders) => {
      if (err) return res.status(500).json({ data: null, message: "Error checking orders", error: err.message });

      if (hasOrders) {
          return res.status(400).json({
              data: null,
              message: "Cannot delete user. They have pending orders."
          });
      }

      hasUserReviews(id, (err, hasReviews) => {
          if (err) return res.status(500).json({ data: null, message: "Error checking reviews", error: err.message });

          if (hasReviews) {
              return res.status(400).json({
                  data: null,
                  message: "Cannot delete user. They have posted reviews or comments."
              });
          }

          deleteUserById(id, (err) => {
              if (err) {
                  return res.status(500).json({
                      data: null,
                      message: "Error deleting user",
                      error: err.message
                  });
              }
              res.json({
                  data: null,
                  message: "User deleted successfully"
              });
          });
      });
  });
};

// Update user details
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  let updatedFields = {};
  if (name) updatedFields.name = name;
  if (email) updatedFields.email = email;
  if (role) updatedFields.role = role;

  updateUserById(id, updatedFields, (err) => {
      if (err) {
          return res.status(500).json({
              data: null,
              message: "An error occurred while updating the user",
              error: err.message
          });
      }

      getUserById(id, (err, updatedUser) => {
          if (err) {
              return res.status(500).json({
                  data: null,
                  message: "Error fetching updated user",
                  error: err.message
              });
          }
          if (!updatedUser) {
              return res.status(404).json({
                  data: null,
                  message: "User not found after update"
              });
          }

          res.json({
              data: updatedUser,
              message: "User updated successfully"
          });
      });
  });
};
