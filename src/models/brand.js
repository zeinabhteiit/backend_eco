import db from "../db.js";

const Brand = {
  getAll: (callback) => {
    db.query("SELECT * FROM Brands", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM Brands WHERE id = ?", [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  },

  create: (name, callback) => {
    db.query("INSERT INTO Brands (name) VALUES (?)", [name], (err, result) => {
      if (err) return callback(err, null);
      const newBrand = { id: result.insertId, name };
      callback(null, newBrand);
    });
  },

  update: (id, name, callback) => {
    db.query("UPDATE Brands SET name = ? WHERE id = ?", [name, id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows > 0);
    });
  },

  delete: (id, callback) => {
    db.query("DELETE FROM Brands WHERE id = ?", [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows > 0);
    });
  },
};

export default Brand;
