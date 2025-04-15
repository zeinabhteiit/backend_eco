import axios from "axios";
import multer from "multer";
import Product from "../models/product.js";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadMiddleware = upload.single("image");

const uploadImageToImgBB = (file, callback) => {
    const apiKey = process.env.IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", file.buffer.toString("base64"));

    axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, {
        headers: { ...formData.getHeaders() },
    })
    .then(response => callback(null, response.data.data.url))
    .catch(error => callback(new Error("Image upload failed"), null));
};

// GET all products
export const getAllProducts = (req, res) => {
    Product.getAll((error, products) => {
        if (error) {
            return res.status(500).json({ message: "Failed to retrieve products", error: error.message });
        }
        res.status(200).json({ data: products });
    });
};

// GET product by ID
export const getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    Product.getById(productId, (error, product) => {
        if (error) return res.status(500).json({ message: "Error retrieving product", error: error.message });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ data: product });
    });
};

// CREATE product
export const addProduct = (req, res) => {
    const { name, brandId, description, quantity, price, color, isNew, category } = req.body;

    if (!name || !price || !quantity || isNew === undefined || !category) {
        return res.status(400).json({ message: "Required fields missing" });
    }

    Product.create(name, brandId, description, quantity, price, color, isNew, category, (err, newProduct) => {
        if (err) return res.status(500).json({ message: "Error creating product", error: err.message });

        if (req.file) {
            uploadImageToImgBB(req.file, (uploadErr, imageUrl) => {
                if (uploadErr) return res.status(500).json({ message: "Image upload failed", error: uploadErr.message });

                Product.saveImage(newProduct.id, imageUrl, (imgErr) => {
                    if (imgErr) return res.status(500).json({ message: "Image saving failed", error: imgErr.message });
                    res.status(201).json({ data: newProduct, imageUrl });
                });
            });
        } else {
            res.status(201).json({ data: newProduct });
        }
    });
};

// UPDATE product
export const updateProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, brandId, description, quantity, price, color, isNew, category } = req.body;

    Product.update(productId, name, brandId, description, quantity, price, color, isNew, category, (err, success) => {
        if (err) return res.status(500).json({ message: "Update error", error: err.message });
        if (!success) return res.status(404).json({ message: "Product not found" });

        if (req.file) {
            uploadImageToImgBB(req.file, (uploadErr, imageUrl) => {
                if (uploadErr) return res.status(500).json({ message: "Image upload failed", error: uploadErr.message });

                Product.saveImage(productId, imageUrl, (imgErr) => {
                    if (imgErr) return res.status(500).json({ message: "Image saving failed", error: imgErr.message });
                    res.status(200).json({ message: "Product and image updated successfully" });
                });
            });
        } else {
            res.status(200).json({ message: "Product updated successfully" });
        }
    });
};

// DELETE product
export const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    Product.delete(productId, (err, success) => {
        if (err) return res.status(500).json({ message: "Delete error", error: err.message });
        if (!success) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    });
};
