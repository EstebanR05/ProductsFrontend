import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    sku: { type: String, required: true, unique: true },
    inStock: { type: Boolean, default: false },
    basePrice: { type: Number, required: true },
    brand: { type: String, required: true },
    stock: { type: Boolean, default: false },
    imageUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);