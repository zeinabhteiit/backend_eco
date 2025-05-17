import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import brandRoutes from "./src/routes/brandRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js"; 
import reviewRoutes from "./src/routes/reviewRoutes.js";
import orderShipmentRoutes from './src/routes/ordershipmentRoutes.js';

//import contactRoutes from "./src/routes/contactRoutes.js";

import orderShipmentAddressRoutes from './src/routes/ordershipmentaddressRoutes.js';
import cookieParser from "cookie-parser";




dotenv.config();
const app = express();



// Enable CORS for a specific origin (your frontend app)
// app.use(cors({
//   origin: 'http://localhost:5173',  // Replace with your frontend's URL

//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',  // Add headers if needed
// }));


const allowedOrigins = [
  'http://localhost:5173',
  //'https://frontend-eco-zee21.vercel.app/' // <-- your actual deployed frontend domain
  'https://frontend-eco-mu.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("🌍 Incoming Origin:", origin);  // 👈 ADD THIS LINE

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked:", origin);   // 👈 OPTIONAL
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

 //app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (_, res) => {
  res.send("Still alive!");
});

// User Routes

app.use('/api/products', productRoutes);
app.use("/api/brands", brandRoutes); // Prefix for brand routes
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/ordershipments", orderShipmentRoutes);

//app.use("/api/contact", contactRoutes);

app.use("/api/ordershipmentaddress", orderShipmentAddressRoutes);


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
