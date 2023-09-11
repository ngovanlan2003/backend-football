const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')
const ReportRouter = require('./ReportRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/order', OrderRouter)
    app.use('/api/report', ReportRouter)
    app.use((req, res, next) => {
        try {
            res.status(404)
            res.json({
                status: "ERR",
                message: "404 NOT FOUND!"
            })
        } catch (error) {
            console.log('error: ', error); 
        }
    })
}


module.exports = routes