import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./mongo.js";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import adminRoute from "./routes/admin.route.js";
import paymentRoute from "./routes/payment.route.js";
import orderRoute from "./routes/order.route.js";

const app = express();
const PORT = process.env.PORT;

await connectDB();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "¡Todo está funcionando!" });
});
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/admin", adminRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
    console.log("=".repeat(110));
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
