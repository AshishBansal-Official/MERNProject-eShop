import express from "express";
import {
    createProductController,
    updateProductController,
    getProductsController,
    getProductController,
    productPhotoController,
    deleteProductController,
    productCountController,
    productFiltersController,
    productListController,
    searchProductController,
    realtedProductController,
    productCategoryController,
    paymentController,
} from "../controllers/productController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

// Routes

// Create Product
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

// Update Product
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

// Get All Products
router.get("/get-products", getProductsController);

// Get Single Product
router.get("/get-product/:slug", getProductController);

// Get Photo
router.get("/product-photo/:pid", productPhotoController);

// Delete Product
router.delete(
    "/delete-product/:pid",
    requireSignIn,
    isAdmin,
    deleteProductController
);

// Filter Product
router.post("/product-filters", productFiltersController);

// Product Count
router.get("/product-count", productCountController);

// Product Per Page
router.get("/product-list/:page", productListController);

// Search Product
router.get("/search/:keyword", searchProductController);

// Similar Product
router.get("/related-product/:pid/:cid", realtedProductController);

// Get Product by Category
router.get("/product-category/:slug", productCategoryController);

// Payments
router.post("/payment", requireSignIn, paymentController);

export default router;
