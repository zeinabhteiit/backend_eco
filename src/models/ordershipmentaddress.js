// src/models/ordershipmentaddress.js
import db from "../db.js";

const OrderShipmentAddress = {
  create: (data, callback) => {
    const sql = "INSERT INTO Order_shipping_address (Full_address, Street_address, department_floor, town_city) VALUES (?, ?, ?, ?)";
    db.execute(sql, [data.Full_address, data.Street_address, data.department_floor, data.town_city], (err, results) => {
      callback(err, results);
    });
  },

  getAll: (callback) => {
    const sql = "SELECT * FROM Order_shipping_address";
    db.execute(sql, (err, results) => {
      callback(err, results);
    });
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM Order_shipping_address WHERE id = ?";
    db.execute(sql, [id], (err, results) => {
      callback(err, results[0]);
    });
  },

  update: (id, data, callback) => {
    const sql = "UPDATE Order_shipping_address SET Full_address = ?, Street_address = ?, department_floor = ?, town_city = ? WHERE id = ?";
    db.execute(sql, [data.Full_address, data.Street_address, data.department_floor, data.town_city, id], (err, results) => {
      callback(err, results);
    });
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM Order_shipping_address WHERE id = ?";
    db.execute(sql, [id], (err, results) => {
      callback(err, results);
    });
  }
};

export default OrderShipmentAddress;
