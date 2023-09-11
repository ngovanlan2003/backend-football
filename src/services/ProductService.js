const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {name, image, type, price, countInStock, description} = newProduct
            if(!name || !image || !type || !price || !countInStock || !description) {
                resolve({
                    status: 'ERR',
                    message: 'Data product is required'
                })
            }

            let checkProduct = await Product.findOne({
                name: name
            })

            if(checkProduct) {
                resolve({
                    status: 'ERR',
                    message: 'Product already exits'
                })
            }

            let createProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                description,
            })

            if(createProduct) {
                resolve({
                    status: 'OK',
                    message: 'Create product success!',
                    data: createProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const updateProduct = (productId, product) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkProduct = await Product.findOne({
                _id: productId
            })

            if(!checkProduct) {
                resolve({
                    status: 'ERR',
                    message: 'Product does not exist '
                })
            }

            let updateProduct = await Product.findByIdAndUpdate(productId, product, { new: true })
            if(updateProduct) {
                resolve({
                    status: 'OK',
                    message: 'UpdateProduct user success!',
                    data: updateProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkProduct = await Product.findOne({
                _id: productId
            })

            if(!checkProduct) {
                resolve({
                    status: 'ERR',
                    message: 'Product does not exits'
                })
            }

            let deleteProduct = await Product.findByIdAndDelete(productId)
            if(deleteProduct) {
                resolve({
                    status: 'OK',
                    message: 'Delete product success!',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getDetailProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkProduct = await Product.findOne({
                _id: productId
            })

            if(!checkProduct) {
                resolve({
                    status: 'ERR',
                    message: 'Product does not exits'
                })
            }

            let getDetailProduct = await Product.findOne({
                _id: productId
            })
            
            if(getDetailProduct) {
                resolve({
                    status: 'OK',
                    message: 'Get detail product success!',
                    data: getDetailProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let totalProduct = await Product.count()
            let getAllProduct = await Product.find().limit(limit).skip(page * limit)
            
            if(getAllProduct) {
                resolve({
                    status: 'OK',
                    message: 'Get All product success!',
                    data: getAllProduct,
                    pageCurrent: +page + 1,
                    totalProduct: totalProduct,
                    maxPage: Math.ceil(totalProduct / limit)
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllProductType = (limit, page, sort, filter, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let totalProduct
            if(!type) {
                totalProduct = await Product.count()
            }else {
                totalProduct = await Product.count({
                    type: type
                })
            }

            let getAllProduct = {}
            if(!type) {
                getAllProduct = await Product.find().limit(limit).skip(page * limit).sort([['updatedAt', 'descending']])
            }else {
                getAllProduct = await Product.find({type: type}).limit(limit).skip(page * limit).sort([['updatedAt', 'descending']])
            }


            if(getAllProduct) {
                resolve({
                    status: 'OK',
                    message: 'Get All product success!',
                    data: getAllProduct,
                    pageCurrent: +page + 1,
                    totalProduct: totalProduct,
                    maxPage: Math.ceil(totalProduct / limit)
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllProductMore = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let totalProduct = await Product.count()
            let getAllProduct = await Product.find({type: type})

            if(getAllProduct) {
                resolve({
                    status: 'OK',
                    message: 'Get All product success!',
                    data: getAllProduct,
                    totalProduct: totalProduct,
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


const getAllProductSearch = (search) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tim
            if(search) {
                tim = search.trim()
            }else {
                resolve({
                    status: 'ERR',
                    message: 'No key search!',
                })
            }
            
            let getAllProduct = await Product.find({ name : { $regex: tim, $options: 'i' } })
            if(getAllProduct) {
                resolve({
                    status: 'OK',
                    message: 'Get All product success!',
                    data: getAllProduct,
                })
            }else {
                resolve({
                    status: 'NO',
                    message: 'Get All product success!',
                    data: getAllProduct,
                })
            }
        } catch (error) {
            reject(error)
        }
    })
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