import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("=".repeat(110));
        console.log("⌛ Conectando a la base de datos...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("=".repeat(110));
        console.log("💾 Conexión establecida con éxito.");
    } catch (error) {
        console.log("=".repeat(110));
        console.log("❌ Error al conectar a la base de datos.", error.message);
        process.exit(1);
    }
};

export default connectDB;
