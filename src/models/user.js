// models/user.js
import db from "../db.js";

// Get all users
export const getAllUsers = (callback) => {
  db.execute(
    "SELECT id, name, email, role FROM Users", // Adjusted for CHAR(50) and no created_at
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

// Get user by email (for login)
export const getUserByEmail = (email, callback) => {
  db.execute(
    "SELECT * FROM Users WHERE email = ?",
    [email],
    (err, result) => {
      if (err || result.length === 0) return callback(err || "No user found");
      callback(null, result[0]); // Return the first matching user
    }
  );
};

// Create new user
export const createUser = (user, callback) => {
  const { name, email, password, role } = user;
  db.execute(
    "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    (err, result) => {
      if (err) return callback(err);
      callback(null, { id: result.insertId, name, email, role });
    }
  );
};

// Update user
export const updateUser = (id, name, role, callback) => {
  db.execute(
    "UPDATE Users SET name = ?, role = ? WHERE id = ?",
    [name, role, id],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

// Delete user
export const deleteUser = (id, callback) => {
  db.execute("DELETE FROM Users WHERE id = ?", [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};