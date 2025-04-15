import express from "express";
import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadMiddleware,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", uploadMiddleware, addProduct);
router.put("/:id", uploadMiddleware, updateProduct);
router.delete("/:id", deleteProduct);

export default router;


