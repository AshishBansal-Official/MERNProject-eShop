import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

// Configure env
dotenv.config();

// esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database config
connectDB();

// Rest Object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Rest Api
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.get("/api/v1", (req, res) => {
    res.send({
        message: "Welcome to eShop",
    });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(
        `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
    );
});
