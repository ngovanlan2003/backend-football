const Order = require("../models/OrderProduct")
const User = require("../models/UserModel")

const getAllReport = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let countOrder = await Order.count({
                'orderItems.status': 'S2',
            })

            let order = await Order.find().populate({
                path: "orderItems",
                populate: {path: 'product'}
            })

            let orderSuccess = await Order.find({
                'orderItems.status': 'S2',
            }).populate({
                path: "orderItems",
                populate: {path: 'product'}
            })

            let user = await User.count()

            let revennu = 0
            let inventory = 0

            for(let i = 0; i < orderSuccess.length; i++) {
                revennu += (orderSuccess[i]?.orderItems?.amount * orderSuccess[i]?.orderItems?.product?.price)
            } 

            for(let i = 0; i < order.length; i++) {
                inventory += order[i]?.orderItems?.product?.countInStock
            } 

            resolve({
                status: 'OK',
                message: 'Get report success',
                countOrder,
                user,
                revennu,
                inventory
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllReport
}