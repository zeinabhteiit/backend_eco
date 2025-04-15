import db from "../db.js";


// CREATE
export function createOrderShipment(data) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO Shipments (order_id, shipment_date, shipment_amount, order_shipment_id)
      VALUES (?, ?, ?, ?)
    `;
    db.execute(sql, [data.order_id, data.shipment_date, data.shipment_amount, data.order_shipment_id], (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, ...data });
    });
  });
}

// READ ALL
export function getAllShipments() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Shipments`;
    db.execute(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

// READ BY ID
export function getShipmentById(id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Shipments WHERE id = ?`;
    db.execute(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
}

// UPDATE
export function updateShipment(id, data) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Shipments 
      SET order_id = ?, shipment_date = ?, shipment_amount = ?, order_shipment_id = ?
      WHERE id = ?
    `;
    db.execute(sql, [data.order_id, data.shipment_date, data.shipment_amount, data.order_shipment_id, id], (err, result) => {
      if (err) return reject(err);
      resolve({ id, ...data });
    });
  });
}

// DELETE
export function deleteShipment(id) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM Shipments WHERE id = ?`;
    db.execute(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve({ message: "Shipment deleted", id });
    });
  });
}
