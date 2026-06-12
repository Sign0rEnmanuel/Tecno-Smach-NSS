import mongoose from "mongoose";

const specSchema = new mongoose.Schema(
    {
        system: { type: String, required: true },
        screen: { type: String, required: true },
        processor: { type: String, required: true },
        ram: { type: String, required: true },
        storage: { type: String, required: true },
        battery: { type: String, required: true },
        camera: { type: String, required: true },
    },
    { timestamps: true, _id: false },
);

export default specSchema;
