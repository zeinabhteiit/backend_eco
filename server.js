import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import brandRoutes from "./src/routes/brandRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js"; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/brands", brandRoutes); // Prefix for brand routes
app.use("/api/orders", orderRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
