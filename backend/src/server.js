import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./mongo.js";
import authRoute from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT;

await connectDB();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "¡Todo está funcionando!" });
});
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
    console.log("=".repeat(110));
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
