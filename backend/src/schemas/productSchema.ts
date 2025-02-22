import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    inStock: { type: Boolean, default: false },
    basePrice: { type: Number, required: true },
    brand: { type: String, required: true },
    stock: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);