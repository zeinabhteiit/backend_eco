import db from "../db.js";

export const createReview = (review, callback) => {
  const { review_description, rating, user_id, product_id } = review;
  const sql = "INSERT INTO Review (review_description, rating, user_id, product_id) VALUES (?, ?, ?, ?)";
  db.execute(sql, [review_description, rating, user_id, product_id], callback);
};

export const getAllReviews = (callback) => {
  const sql = "SELECT * FROM Review";
  db.execute(sql, [], callback);
};

export const getReviewById = (id, callback) => {
  const sql = "SELECT * FROM Review WHERE id = ?";
  db.execute(sql, [id], callback);
};

export const updateReview = (id, review, callback) => {
  const { review_description, rating } = review;
  const sql = "UPDATE Review SET review_description = ?, rating = ? WHERE id = ?";
  db.execute(sql, [review_description, rating, id], callback);
};

export const deleteReview = (id, callback) => {
  const sql = "DELETE FROM Review WHERE id = ?";
  db.execute(sql, [id], callback);
};

