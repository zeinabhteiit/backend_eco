import Brand from "../models/brand.js";

// Get all brands
export const getAllBrands = (req, res) => {
  Brand.getAll((err, brands) => {
    if (err) {
      return res.status(500).json({
        data: null,
        message: "Failed to retrieve brands",
        error: err.message
      });
    }

    res.status(200).json({
      data: brands,
      message: "Brands retrieved successfully",
      error: null
    });
  });
};

// Get a single brand by ID
export const getBrandById = (req, res) => {
  const brandId = parseInt(req.params.id, 10);

  Brand.getById(brandId, (err, brand) => {
    if (err) {
      return res.status(500).json({
        data: null,
        message: "Failed to retrieve brand",
        error: err.message
      });
    }

    if (!brand) {
      return res.status(404).json({
        data: null,
        message: "Brand not found",
        error: null
      });
    }

    res.status(200).json({
      data: brand,
      message: "Brand retrieved successfully",
      error: null
    });
  });
};

// Add a new brand
export const addBrand = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      data: null,
      message: "Name is required",
      error: null
    });
  }

  Brand.create(name, (err, newBrand) => {
    if (err) {
      return res.status(500).json({
        data: null,
        message: "Failed to add brand",
        error: err.message
      });
    }

    res.status(201).json({
      data: newBrand,
      message: "Brand added successfully",
      error: null
    });
  });
};

// Update a brand
export const updateBrand = (req, res) => {
  const brandId = parseInt(req.params.id, 10);
  const { name } = req.body;

  Brand.update(brandId, name, (err, success) => {
    if (err) {
      return res.status(500).json({
        data: null,
        message: "Failed to update brand",
        error: err.message
      });
    }

    if (!success) {
      return res.status(404).json({
        data: null,
        message: "Brand not found or not updated",
        error: null
      });
    }

    res.status(200).json({
      data: null,
      message: "Brand updated successfully",
      error: null
    });
  });
};

// Delete a brand
export const deleteBrand = (req, res) => {
  const brandId = parseInt(req.params.id, 10);

  Brand.delete(brandId, (err, success) => {
    if (err) {
      return res.status(500).json({
        data: null,
        message: "Failed to delete brand",
        error: err.message
      });
    }

    if (!success) {
      return res.status(404).json({
        data: null,
        message: "Brand not found",
        error: null
      });
    }

    res.status(200).json({
      data: null,
      message: "Brand deleted successfully",
      error: null
    });
  });
};
