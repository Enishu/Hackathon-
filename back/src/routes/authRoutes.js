import {
    forgottenPassword,
    login,
    register,
    verifyEmail,
} from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", login);
router.post("/forgotten-password", forgottenPassword);

export default router;
