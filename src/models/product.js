import db from "../db.js";

const Product = {
    getAll: (callback) => {
        const query = `
            SELECT Products.*, Images.url AS imageUrl 
            FROM Products 
            LEFT JOIN Images ON Products.id = Images.product_id
        `;
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = `
            SELECT Products.*, Images.url AS imageUrl 
            FROM Products 
            LEFT JOIN Images ON Products.id = Images.product_id
            WHERE Products.id = ?
        `;
        db.query(query, [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]);
        });
    },

    create: (name, brandId, description, quantity, price, color, isNew, category, callback) => {
        const query = `
            INSERT INTO Products 
            (name, brandId, description, quantity, price, color, isNew, category)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [name, brandId, description, quantity, price, color, isNew, category];
        db.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            callback(null, { id: result.insertId, name, brandId, description, quantity, price, color, isNew, category });
        });
    },

    update: (id, name, brandId, description, quantity, price, color, isNew, category, callback) => {
        const query = `
            UPDATE Products SET 
            name = ?, brandId = ?, description = ?, quantity = ?, price = ?, 
            color = ?, isNew = ?, category = ? 
            WHERE id = ?
        `;
        const values = [name, brandId, description, quantity, price, color, isNew, category, id];
        db.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.affectedRows > 0);
        });
    },

    delete: (id, callback) => {
        const query = "DELETE FROM Products WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.affectedRows > 0);
        });
    },

    saveImage: (productId, imageUrl, callback) => {
        const query = "INSERT INTO Images (product_id, url) VALUES (?, ?)";
        db.query(query, [productId, imageUrl], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.affectedRows > 0);
        });
    }
};

export default Product;
