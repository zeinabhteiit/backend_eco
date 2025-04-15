// src/routes/orderShipmentAddressRoutes.js
import express from "express";
import {
  createOrderShipmentAddress,
  getAllOrderShipmentAddresses,
  getOrderShipmentAddressById,
  updateOrderShipmentAddress,
  deleteOrderShipmentAddress
} from "../controllers/ordershipmentaddressController.js";

const router = express.Router();

router.post("/", createOrderShipmentAddress);
router.get("/", getAllOrderShipmentAddresses);
router.get("/:id", getOrderShipmentAddressById);
router.put("/:id", updateOrderShipmentAddress);
router.delete("/:id", deleteOrderShipmentAddress);

export default router;
