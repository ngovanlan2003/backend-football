const OrderService = require("../services/OrderService")


//order
const createOrder = async (req, res) => {
    try {
        let order = req.body
        let responve = await OrderService.createOrder(order)
        return res.status(200).json(responve)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        let {limit, page, sort, filter} = req.query
        let responve = await OrderService.getAllOrder(limit || 8, page || 0, sort, filter)
        return res.status(200).json(responve)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        let idOrder = req.params.id
        let responve = await OrderService.deleteOrder(idOrder)
        return res.status(200).json(responve)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}

const confirmOrder = async (req, res) => {
    try {
        let {id} = req.body
        let responve = await OrderService.confirmOrder(id)
        return res.status(200).json(responve)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}

const getDetailOrder = async (req, res) => {
    try {
        let idOrder = req.params.id
        let responve = await OrderService.getDetailOrder(idOrder)
        return res.status(200).json(responve)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}

const getAllOrderUser = async (req, res) => {
    try {
        let idUser = req.params.id
        let responve = await OrderService.getAllOrderUser(idUser)
        return res.status(200).json(responve)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}
//cart
const createCart = async (req, res) => {
    try {
        let cart = req.body
        let responve = await OrderService.createCart(cart)
        return res.status(200).json(responve)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}

const getAllCart = async (req, res) => {
    try {
        let id = req.params.id
        let responve = await OrderService.getAllCart(id)
        return res.status(200).json(responve)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}

const deleteCart = async (req, res) => {
    try {
        let idCart = req.params.id
        let responve = await OrderService.deleteCart(idCart)
        return res.status(200).json(responve)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}

const createStatusOrder = async (req, res) => {
    try {
        let {type, name} = req.body
        let responve = await OrderService.createStatusOrder(type, name)
        return res.status(200).json(responve)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
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