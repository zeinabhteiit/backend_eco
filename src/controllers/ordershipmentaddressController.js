// src/controllers/orderShipmentAddressController.js
import OrderShipmentAddress from "../models/ordershipmentaddress.js";

export const createOrderShipmentAddress = (req, res) => {
  const { Full_address, Street_address, department_floor, town_city } = req.body;

  if (!Full_address || !Street_address || !department_floor || !town_city) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  OrderShipmentAddress.create({ Full_address, Street_address, department_floor, town_city }, (err, result) => {
    if (err) return res.status(500).json({ message: "Create failed", error: err.message });
    res.status(201).json({ message: "Created successfully", data: result });
  });
};

export const getAllOrderShipmentAddresses = (req, res) => {
  OrderShipmentAddress.getAll((err, results) => {
    if (err) return res.status(500).json({ message: "Fetch failed", error: err.message });
    res.status(200).json({ data: results });
  });
};

export const getOrderShipmentAddressById = (req, res) => {
  const { id } = req.params;
  OrderShipmentAddress.getById(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Fetch by ID failed", error: err.message });
    if (!result) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ data: result });
  });
};

export const updateOrderShipmentAddress = (req, res) => {
  const { id } = req.params;
  const { Full_address, Street_address, department_floor, town_city } = req.body;

  if (!Full_address || !Street_address || !department_floor || !town_city) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  OrderShipmentAddress.update(id, { Full_address, Street_address, department_floor, town_city }, (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed", error: err.message });
    res.status(200).json({ message: "Updated successfully", data: result });
  });
};

export const deleteOrderShipmentAddress = (req, res) => {
  const { id } = req.params;
  OrderShipmentAddress.delete(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed", error: err.message });
    res.status(200).json({ message: "Deleted successfully", data: result });
  });
};
