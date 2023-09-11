const Order = require('../models/OrderProduct')
const Cart = require('../models/CartModel')
const Product = require('../models/ProductModel')
const StatusOrder = require('../models/StatusOrderModel')
const mongoose = require('mongoose')


const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {orderItems, paymentMethod} = newOrder
            if(!orderItems.amount || !orderItems.product || !orderItems.user || !orderItems.status || !paymentMethod) {
                resolve({
                    status: 'ERR',
                    message: 'Data order is required'
                })
            }

            let check = await Order.findOne({
                'orderItems.product': orderItems.product,
                'orderItems.user': orderItems.user,
                'orderItems.status': 'S1'
            })

            if(check) {
                let updateOrder = await Order.updateOne({
                    'orderItems.product': orderItems.product,
                    'orderItems.user': orderItems.user
                }, {
                    $inc : {'orderItems.amount' : orderItems.amount}
                })

                if(updateOrder) {
                    resolve({
                        status: 'OK',
                        message: 'Update order success',
                        data: updateOrder
                    })
                }
            }else {
                let order = await Order.create({
                    orderItems: {
                        amount: orderItems.amount,
                        status: orderItems.status,
                        product: orderItems.product,
                        user: orderItems.user,
                    },
                    paymentMethod
                })
                if(order) {
                    resolve({
                        status: 'OK',
                        message: 'Create order success',
                        data: order
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllOrder = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let totalOrder = await Order.count()
            let getAllOrder = await Order.find().populate({
                path: "orderItems",
                populate: {path: 'product'}
            }).populate({
                path: "orderItems",
                populate: {path: 'user'}
            }).limit(limit).skip(page * limit)

            if(getAllOrder) {
                resolve({
                    status: 'OK',
                    message: 'Get all order success!',
                    data: getAllOrder,
                    totalOrder: totalOrder,
                    maxPage: Math.ceil(totalOrder / limit)
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteOrder = (idOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!idOrder) {
                resolve({
                    status: 'ERR',
                    message: 'Order id is null!',
                })
            }

            let check = await Order.findOne({
                _id: idOrder
            })

            if(!check) {
                resolve({
                    status: 'ERR',
                    message: 'The order does not exist in the database!',
                })
            }

            let deleteOrder = await Order.findByIdAndDelete(idOrder)
            if(deleteOrder) {
                resolve({
                    status: 'OK',
                    message: 'Delete order success!',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getDetailOrder = (idOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!idOrder) {
                resolve({
                    status: 'ERR',
                    message: 'Order id is null!',
                })
            }

            let order = await Order.findOne({
                _id: idOrder
            }).populate({
                path: "orderItems",
                populate: {path: 'product'}
            }).populate({
                path: "orderItems",
                populate: {path: 'user'}
            })

            if(!order) {
                resolve({
                    status: 'ERR',
                    message: 'The order does not exist in the database!',
                })
            }else {
                resolve({
                    status: 'OK',
                    message: 'Delete order success!',
                    data: order
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

const getAllOrderUser = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let getAllOrder = await Order.find({
                'orderItems.user': idUser,
                'orderItems.status': 'S1',
            }).populate({
                path: "orderItems",
                populate: {path: 'product'}
            }).populate({
                path: "orderItems",
                populate: {path: 'user'}
            })
            
            if(getAllOrder) {
                resolve({
                    status: 'OK',
                    message: 'Get all order success!',
                    data: getAllOrder,
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const confirmOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!id) {
                resolve({
                    status: 'ERR',
                    message: 'Id order is null!',
                })
            }

            let check = await Order.findOne({
                _id: id
            })
            
            if(!check) {
                resolve({
                    status: 'ERR',
                    message: 'Order no exits!',
                })
            }

            let idProduct = check?.orderItems?.product
            let updateProduct = await Product.findByIdAndUpdate(idProduct,  {
                $inc : {
                    'sold' : check?.orderItems?.amount,
                    'countInStock': -check?.orderItems?.amount
                }
            }, { new: true })

            let updateOrder = await Order.findByIdAndUpdate(id, {'orderItems.status': 'S2'}, { new: true })

            if(updateOrder) {
                resolve({
                    status: 'OK',
                    message: 'Update order success!',
                    data: updateOrder,
                    updateProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

//cart
const createCart = (newCart) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {amount, product, user} = newCart
            if(!amount || !product || !user) {
                resolve({
                    status: 'ERR',
                    message: 'Data cart is required'
                })
            }

            let check = await Cart.findOne({
                product,
                user
            })

            if(check) {
                let updateCart = await Cart.updateOne({
                    product,
                    user
                }, {
                    amount: (amount + check.amount),
                    product,
                    user
                })

                if(updateCart) {
                    resolve({
                        status: 'OK',
                        message: 'Update cart success',
                        data: updateCart
                    })
                }
            }else {
                let cart = await Cart.create({
                    amount,
                    product,
                    user
                })
                if(cart) {
                    resolve({
                        status: 'OK',
                        message: 'Create cart success',
                        data: cart
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllCart = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!idUser) {
                resolve({
                    status: 'ERR',
                    message: 'User id is null!',
                })
            }

            let totalCart = await Cart.count()
            let getAllCart = await Cart.find({
                user: idUser
            }).populate('product')
          
            if(getAllCart) {
                resolve({
                    status: 'OK',
                    message: 'Get all cart success!',
                    data: getAllCart,
                    totalCart: totalCart
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteCart = (idCart) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!idCart) {
                resolve({
                    status: 'ERR',
                    message: 'Cart id is null!',
                })
            }

            let check = await Cart.findOne({
                _id: idCart
            })

            if(!check) {
                resolve({
                    status: 'ERR',
                    message: 'The cart does not exist in the database!',
                })
            }

            let deleteCart = await Cart.findByIdAndDelete(idCart)
            if(deleteCart) {
                resolve({
                    status: 'OK',
                    message: 'Delete cart success!',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const createStatusOrder = (type, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!type || !name) {
                resolve({
                    status: 'ERR',
                    message: 'Data is null!',
                })
            }

            let check = await StatusOrder.find({
                type
            })

            if(check) {
                resolve({
                    status: 'ERR',
                    message: 'The cart is exist in the database!',
                })
            }

            let create = await StatusOrder.create({
                type,
                name
            })
            if(create) {
                resolve({
                    status: 'OK',
                    message: 'Create status order success!',
                    data: create
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createOrder,
    createCart,
    getAllCart,
    getAllOrder,
    deleteOrder,
    getDetailOrder,
    deleteCart,
    createStatusOrder,
    getAllOrderUser,
    confirmOrder
}