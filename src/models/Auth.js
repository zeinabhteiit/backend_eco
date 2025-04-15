import db from "../db.js";  // Assuming you're using some DB connection

// Find user by email
export const findUserByEmail = (email, callback) => {
    const query = "SELECT * FROM Users WHERE email = ?";
    db.query(query, [email], callback);
};

// Create a new user
export const createUser = (name, email, password, callback) => {
    const query = "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, 'user')";
    db.query(query, [name, email, password], callback);
};

// Find user by ID
export const findUserById = (id, callback) => {
    const query = "SELECT * FROM Users WHERE id = ?";
    db.query(query, [id], callback);
};
