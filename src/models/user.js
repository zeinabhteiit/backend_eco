import db from "../db.js";

// Fetch all users
export const getAllUsers = (callback) => {
    db.execute("SELECT id, name, email, role FROM Users", (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

// Create a new user
export const createUser = (userData, callback) => {
    const { name, email, password, role } = userData;
    db.execute(
        "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, password, role],
        (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        }
    );
};

// Delete user by ID
export const deleteUserById = (id, callback) => {
    db.execute("DELETE FROM Users WHERE id = ?", [id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

// Check if user has pending orders
export const hasPendingOrders = (id, callback) => {
    db.execute(
        "SELECT COUNT(*) AS count FROM Orders WHERE user_id = ? AND status IN ('pending', 'shipped')",
        [id],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0].count > 0);
        }
    );
};

// Check if user has posted reviews
export const hasUserReviews = (id, callback) => {
    db.execute("SELECT COUNT(*) AS count FROM Review WHERE user_id = ?", [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0].count > 0);
    });
};

// Update user details
export const updateUserById = (id, updatedFields, callback) => {
    const keys = Object.keys(updatedFields);
    if (keys.length === 0) return callback(new Error("No fields to update"), null);

    const setClause = keys.map(key => `${key} = ?`).join(", ");
    const values = [...Object.values(updatedFields), id];

    db.execute(`UPDATE Users SET ${setClause} WHERE id = ?`, values, (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

// Fetch a user by ID
export const getUserById = (id, callback) => {
    db.execute("SELECT id, name, email, role FROM Users WHERE id = ?", [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0] || null);
    });
};


