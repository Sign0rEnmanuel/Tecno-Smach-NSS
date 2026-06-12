import mongoose from "mongoose";
import specSchema from "./Spec.js";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        category: {
            type: String,
            enum: [
                "smartphone",
                "laptop",
                "printer",
                "accessories",
                "tv",
                "camera",
            ],
            required: true,
        },
        image: { type: String, required: true },
        brand: { type: String, required: true },
        model: { type: String, required: true },
        specifications: { type: specSchema, required: true },
    },
    { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
