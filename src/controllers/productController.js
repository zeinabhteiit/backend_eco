import Product from "../models/product.js";

export const getAllProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ data: products });
  });
};

export const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  Product.getById(id, (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ data: product });
  });
};

export const createProduct = (req, res) => {
  const { name, brandId, description, quantity, price, color, isNew, category } = req.body;

  if (!name || !price || quantity == null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  Product.create(name, brandId, description, quantity, price, color, isNew, category, (err, newProduct) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Product created", data: newProduct });
  });
};

export const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, brandId, description, quantity, price, color, isNew, category } = req.body;

  Product.update(id, name, brandId, description, quantity, price, color, isNew, category, (err, success) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!success) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated" });
  });
};

export const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);

  Product.delete(id, (err, success) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!success) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  });
};
