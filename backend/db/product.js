// Update Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId: String,
    company: String,
    description: String,    // Detailed product description
    features: [String],     // Array of features
    specifications: Object, // Technical specifications
    imageUrl: String        // Product image
});

module.exports = mongoose.model("products", productSchema);