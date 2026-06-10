import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./mongo.js";

const app = express();
const PORT = process.env.PORT;

await connectDB();
app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "¡Todo está funcionando!" });
});

app.listen(PORT, () => {
    console.log("=".repeat(110));
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
