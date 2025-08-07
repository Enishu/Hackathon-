import {
    forgotPassword,
    login,
    register,
    resetPassword,
    verifyEmail,
} from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email/:token", verifyEmail);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword)

export default router;
