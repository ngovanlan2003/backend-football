const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        image: { type: String, required: true},
        type: { type: String, required: true},
        price: { type: Number, required: true},
        countInStock: { type: Number, required: true},
        rating: { type: Number, required: false},
        description: { type: String, required: true},
        sold: { type: Number, default: 0},
        updatedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", productSchema)
module.exports = Product