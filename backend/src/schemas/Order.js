import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        paymentStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        deliveryStatus: {
            type: String,
            enum: ["preparing", "shipped", "delivered"],
            default: "preparing",
        },
        mpPreferenceId: { type: String },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
