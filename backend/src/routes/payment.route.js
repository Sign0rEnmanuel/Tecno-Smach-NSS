import express from "express";
import {
    createPreference,
    webhook,
} from "../controllers/payment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-preference", authMiddleware, createPreference);
router.post("/webhook", webhook);
router.get("/webhook", webhook);

export default router;
