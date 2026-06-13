import express from "express";
import {
    getMyOrders,
    getAllOrders,
    updateDeliveryStatus,
} from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/mine", authMiddleware, getMyOrders);

router.get("/all", authMiddleware, adminMiddleware, getAllOrders);
router.put(
    "/update-delivery/:id",
    authMiddleware,
    adminMiddleware,
    updateDeliveryStatus,
);

export default router;
