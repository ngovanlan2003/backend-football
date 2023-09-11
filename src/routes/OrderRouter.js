const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authMiddleware, authUserMiddleware } = require("../Middleware/authMiddleware");

//order
router.post('/create-order', OrderController.createOrder)
router.get('/get-all-order', OrderController.getAllOrder)
router.delete('/delete-order/:id', OrderController.deleteOrder)
router.get('/get-detail-order/:id', OrderController.getDetailOrder)
router.get('/get-all-order-user/:id', OrderController.getAllOrderUser)
router.put('/confirm-order/', OrderController.confirmOrder)

//cart
router.post('/create-cart', OrderController.createCart)
router.get('/get-all-cart/:id', OrderController.getAllCart)
router.delete('/delete-cart/:id', OrderController.deleteCart)

//status order
router.post('/create-status-order/', OrderController.createStatusOrder)


module.exports = router