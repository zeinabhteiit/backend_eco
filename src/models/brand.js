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

  create: (name, image, callback) => {
    db.query("INSERT INTO Brands (name, image) VALUES (?, ?)", [name, image], (err, result) => {
      if (err) return callback(err, null);
      const newBrand = { id: result.insertId, name, image };
      callback(null, newBrand);
    });
  },

  update: (id, name, image, callback) => {
    db.query("UPDATE Brands SET name = ?, image = ? WHERE id = ?", [name, image, id], (err, result) => {
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
