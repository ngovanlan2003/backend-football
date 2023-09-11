const ProductService = require("../services/ProductService")

const createProduct = async (req, res) => {
    try {
        let product = req.body
        let responve = await ProductService.createProduct(product)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        let productId = req.params.id
        if(!productId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'productId is  not required'
            })
        }
        let product = req.body
        let responve = await ProductService.updateProduct(productId, product)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let productId = req.params.id
        if(!productId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'ProductId is  not required'
            })
        }
        let responve = await ProductService.deleteProduct(productId)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const getDetailProduct = async (req, res) => {
    try {
        let productId = req.params.id
        if(!productId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'ProductId is not required'
            })
        }
        let responve = await ProductService.getDetailProduct(productId)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        let {limit, page, sort, filter} = req.query
        let responve = await ProductService.getAllProduct(limit || 8, page || 0, sort, filter)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const getAllProductType = async (req, res) => {
    try {
        let {limit, page, sort, filter, type} = req.query
        let responve = await ProductService.getAllProductType(limit || 8, page || 0, sort, filter, type || "")
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const getAllProductMore = async (req, res) => {
    try {
        let {type} = req.query
        let responve = await ProductService.getAllProductMore(type)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const getAllProductSearch = async (req, res) => {
    try {
        let {limit, page, sort, search} = req.query
        let responve = await ProductService.getAllProductSearch(search)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailProduct,
    getAllProduct,
    getAllProductType,
    getAllProductMore,
    getAllProductSearch
}