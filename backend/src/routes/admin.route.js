import express from "express";
import {
    getAllUsers,
    changeUserRole,
} from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/users", getAllUsers);
router.put("/users/:id/role", changeUserRole);

export default router;
