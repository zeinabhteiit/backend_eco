import db from "../db.js";
import bcrypt from "bcryptjs";

export const findUserByEmail = (email, callback) => {
    db.execute("SELECT id, name, email, password, role FROM Users WHERE email = ?", [email], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results.length > 0 ? results[0] : null);
    });
};

export const createUser = (name, email, password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return callback(err, null);

        db.execute(
            "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, "user"],
            (err, result) => {
                if (err) return callback(err, null);
                callback(null, { id: result.insertId, name, email, role: "user" });
            }
        );
    });
};

export const findUserById = (id, callback) => {
    db.execute("SELECT id, name, email, role FROM Users WHERE id = ?", [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results.length > 0 ? results[0] : null);
    });
};