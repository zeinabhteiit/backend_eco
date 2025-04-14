import db from "../db.js";

export const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM Orders", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM Orders WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

export const createOrder = (orderData) => {
  const { subtotal_amount, total_amount, order_date, status, user_id } = orderData;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO Orders (subtotal_amount, total_amount, order_date, status, user_id) VALUES (?, ?, ?, ?, ?)",
      [subtotal_amount, total_amount, order_date, status, user_id],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, ...orderData });
      }
    );
  });
};

export const updateOrder = (id, updatedData) => {
  const { subtotal_amount, total_amount, order_date, status, user_id } = updatedData;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE Orders SET subtotal_amount = ?, total_amount = ?, order_date = ?, status = ?, user_id = ? WHERE id = ?",
      [subtotal_amount, total_amount, order_date, status, user_id, id],
      (err) => {
        if (err) return reject(err);
        resolve({ id, ...updatedData });
      }
    );
  });
};

export const deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM Orders WHERE id = ?", [id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
