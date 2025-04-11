import db from "../db.js";

const Product = {
  getAll: (callback) => {
    const sql = "SELECT * FROM Products";
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM Products WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  create: (name, brandId, description, quantity, price, color, isNew, category, callback) => {
    const sql = `
      INSERT INTO Products (name, brandId, description, quantity, price, color, isNew, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, brandId, description, quantity, price, color, isNew, category];
    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, { id: result.insertId, name, brandId, description, quantity, price, color, isNew, category });
    });
  },

  update: (id, name, brandId, description, quantity, price, color, isNew, category, callback) => {
    const sql = `
      UPDATE Products
      SET name = ?, brandId = ?, description = ?, quantity = ?, price = ?, color = ?, isNew = ?, category = ?
      WHERE id = ?
    `;
    const values = [name, brandId, description, quantity, price, color, isNew, category, id];
    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result.affectedRows > 0);
    });
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM Products WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result.affectedRows > 0);
    });
  }
};

export default Product;
