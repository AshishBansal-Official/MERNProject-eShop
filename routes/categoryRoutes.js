import express from "express";
import {
    createCategoryController,
    updateCategoryController,
    getCategoriesController,
    getCategoryController,
    deleteCategoryController,
} from "../controllers/categoryController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes

// Create Category
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
);

// Update Category
router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
);

// Get All Categories
router.get("/get-categories", getCategoriesController);

// Get Single Category
router.get("/get-category/:slug", getCategoryController);

// Delete Category
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
);

export default router;
