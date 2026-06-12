import express from "express";
import {
    allProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
} from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/all", authMiddleware, adminMiddleware, allProducts);
router.get("/all/:id", authMiddleware, adminMiddleware, getProductById);
router.post("/create", authMiddleware, adminMiddleware, createProduct);
router.put("/update/:id", authMiddleware, adminMiddleware, updateProductById);
router.delete(
    "/delete/:id",
    authMiddleware,
    adminMiddleware,
    deleteProductById,
);

export default router;
