import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
} from "../models/review.js";

export const create = (req, res) => {
  createReview(req.body, (err, results) => {
    if (err) {
      return res.status(500).json({ data: null, message: "Error creating review", error: err.message });
    }
    res.status(201).json({ data: results, message: "Review created successfully", error: null });
  });
};

export const getAll = (req, res) => {
  getAllReviews((err, results) => {
    if (err) {
      return res.status(500).json({ data: null, message: "Error retrieving reviews", error: err.message });
    }
    res.status(200).json({ data: results, message: "Reviews fetched successfully", error: null });
  });
};

export const getById = (req, res) => {
  getReviewById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).json({ data: null, message: "Error retrieving review", error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ data: null, message: "Review not found", error: "Not Found" });
    }
    res.status(200).json({ data: results[0], message: "Review fetched successfully", error: null });
  });
};

export const update = (req, res) => {
  updateReview(req.params.id, req.body, (err, results) => {
    if (err) {
      return res.status(500).json({ data: null, message: "Error updating review", error: err.message });
    }
    res.status(200).json({ data: results, message: "Review updated successfully", error: null });
  });
};

export const remove = (req, res) => {
  deleteReview(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).json({ data: null, message: "Error deleting review", error: err.message });
    }
    res.status(200).json({ data: results, message: "Review deleted successfully", error: null });
  });
};
