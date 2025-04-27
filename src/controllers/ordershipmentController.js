 import {
    createOrderShipment,
    getAllShipments,
    getShipmentById,
    updateShipment,
    deleteShipment
  } from '../models/ordershipment.js';
  
  // CREATE
  export function createNewOrderShipment(req, res) {
    const data = req.body;
    createOrderShipment(data)
      .then(result => {
        res.status(201).json({ data: result, message: "Shipment created successfully", error: null });
      })
      .catch(err => {
        res.status(500).json({ data: null, message: "Failed to create shipment", error: err.message });
      });
  }
  
  // GET ALL
  export function getShipments(req, res) {
    getAllShipments()
      .then(result => {
        res.status(200).json({ data: result, message: "Shipments fetched successfully", error: null });
      })
      .catch(err => {
        res.status(500).json({ data: null, message: "Failed to fetch shipments", error: err.message });
      });
  }
  
  // GET BY ID
  export function getShipment(req, res) {
    const id = req.params.id;
    getShipmentById(id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ data: null, message: "Shipment not found", error: null });
        }
        res.status(200).json({ data: result, message: "Shipment found", error: null });
      })
      .catch(err => {
        res.status(500).json({ data: null, message: "Error fetching shipment", error: err.message });
      });
  }
  
  // UPDATE
  export function updateOrderShipment(req, res) {
    const id = req.params.id;
    const data = req.body;
  
    // Check if the shipment exists before updating
    getShipmentById(id)
      .then(shipment => {
        if (!shipment) {
          return res.status(404).json({ data: null, message: "Shipment not found", error: null });
        }
  
        updateShipment(id, data)
          .then(updatedShipment => {
            res.status(200).json({ data: updatedShipment, message: "Shipment updated successfully", error: null });
          })
          .catch(err => {
            res.status(500).json({ data: null, message: "Failed to update shipment", error: err.message });
          });
      })
      .catch(err => {
        res.status(500).json({ data: null, message: "Error fetching shipment", error: err.message });
      });
  }
  
  // DELETE
  export function deleteOrderShipment(req, res) {
    const id = req.params.id;
  
    // Check if the shipment exists before deleting
    getShipmentById(id)
      .then(shipment => {
        if (!shipment) {
          return res.status(404).json({ data: null, message: "Shipment not found", error: null });
        }
  
        deleteShipment(id)
          .then(() => {
            res.status(200).json({ data: null, message: "Shipment deleted successfully", error: null });
          })
          .catch(err => {
            res.status(500).json({ data: null, message: "Failed to delete shipment", error: err.message });
          });
      })
      .catch(err => {
        res.status(500).json({ data: null, message: "Error fetching shipment", error: err.message });
      });
  }
  
