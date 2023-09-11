const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err) {
            return res.status(404).json({
                message: 'Not an admin',
                status: 'ERR'
            })
        } 
        let { payload } = user
        if(user?.isAdmin) {
            next()
        }else {
            return res.status(404).json({
                message: 'Not an admin',
                status: 'ERR'
            })
        }
    });
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err) {
            console.log("err: ", err);
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERR'
            })
        } 
        if(user?.isAdmin || user?.id === userId) {
            next()
        }else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERR'
            })
        }
    });
}

module.exports = {
    authMiddleware, authUserMiddleware
}