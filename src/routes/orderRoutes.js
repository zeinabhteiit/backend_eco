import express from "express";
import {
  fetchOrders,
  fetchOrderById,
  createNewOrder,
  updateExistingOrder,
  deleteExistingOrder,
} from "../controllers/orderController.js";


const router = express.Router();

router.get("/", fetchOrders);
router.get("/:id", fetchOrderById);
router.post("/", createNewOrder);
router.put("/:id", updateExistingOrder);
router.delete("/:id", deleteExistingOrder);

export default router;