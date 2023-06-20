import express from "express";
import {
    registerController,
    loginController,
    testController,
    updateProfileController,
    getOrdersController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

// Router object
const router = express.Router();

// Routing
// Register || Method POST
router.post("/register", registerController);

// Login || Method POST
router.post("/login", loginController);

// Test Route
router.get("/test", requireSignIn, isAdmin, testController);

// Protected User Route Auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

// Protected Admin Route Auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// Update Profile
router.put("/profile", requireSignIn, updateProfileController);

// Orders
router.get("/orders", requireSignIn, getOrdersController);

export default router;
