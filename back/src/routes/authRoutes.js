import {
    forgottenPassword,
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

router.post("/forgotten-password", forgottenPassword);
// router.get("/reset-password/:token", resetPassword)
router.patch("/reset-password/:token", resetPassword)

export default router;
