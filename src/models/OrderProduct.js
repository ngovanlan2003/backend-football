const mongoose = require('mongoose')
const StatusOrder = require('./StatusOrderModel')

const orderSchema = new mongoose.Schema({
    orderItems: 
        {
            amount: { type: Number, required: true},
            status: { type: String, required: true},
            product: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            user: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
       ,
    
    // shippingAddress: {
    //     fullName: { type: String, required: true},
    //     address: { type: String, required: true},
    //     city: { type: String, required: true},
    //     phone: { type: Number, required: true},
    // },
    paymentMethod: { type: String, required: true},
    isPaid: { type: Boolean, default: false},
    // itemsPrice: { type: Number, required: true},
    // shippingPrice: { type: Number, required: true},
    // taxPrice: { type: Number, required: true},
    // totalPrice: { type: Number, required: true},
    // paidAt: { type: Date},
    // isDelivered: { type: Boolean, default: false},
    // deliveredAt: { type: Date},
},
    {
        timestamps: true
    }
)

const Order = mongoose.model("Order", orderSchema)
module.exports = Order