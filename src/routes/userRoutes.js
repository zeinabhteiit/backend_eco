// routes/userRoutes.js
import express from "express";
import {
  getUsers,
  getUser,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/userController.js";

const router = express.Router();

// GET all users
router.get("/", getUsers);

// GET user by email
router.get("/:email", getUser);

// CREATE new user
router.post("/", createUserHandler);

// UPDATE user
router.put("/:id", updateUserHandler);

// DELETE user
router.delete("/:id", deleteUserHandler);

export default router;
