import express from "express";
import {
  createNewOrderShipment,
  getShipments,
  getShipment,
  updateOrderShipment,
  deleteOrderShipment
} from "../controllers/ordershipmentController.js";

const router = express.Router();

router.post("/", createNewOrderShipment);      // Create
router.get("/", getShipments);                 // Read All
router.get("/:id", getShipment);               // Read One
router.put("/:id", updateOrderShipment);       // Update
router.delete("/:id", deleteOrderShipment);    // Delete

export default router;
