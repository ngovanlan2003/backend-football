const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');

router.post('/create-product', ProductController.createProduct)
router.put('/update-product/:id', ProductController.updateProduct)
router.delete('/delete-product/:id', ProductController.deleteProduct)
router.get('/get-detail-product/:id', ProductController.getDetailProduct)
router.get('/get-all-product', ProductController.getAllProduct)
router.get('/get-all-product-type', ProductController.getAllProductType)
router.get('/get-all-product-more', ProductController.getAllProductMore)
router.get('/get-all-product-search', ProductController.getAllProductSearch)

module.exports = router