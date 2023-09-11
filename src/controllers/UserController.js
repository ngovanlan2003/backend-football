const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        let user = req.body
        let responve = await UserService.createUser(user)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        let userId = req.params.id
        if(!userId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'UserId is  not required'
            })
        }
        let user = req.body
        let responve = await UserService.updateUser(userId, user)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        let userId = req.params.id
        if(!userId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'UserId is  not required'
            })
        }
        let responve = await UserService.deleteUser(userId)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const getDetailUser = async (req, res) => {
    try {
        let userId = req.params.id
        if(!userId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'UserId is  not required'
            })
        }
        let responve = await UserService.getDetailUser(userId)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        let page = req.query.page
        let limit = req.query.limit
        let responve = await UserService.getAllUser(page || 0, limit || 8)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const registerUser = async (req, res) => {
    try {
        let user = req.body
        let responve = await UserService.registerUser(user)
        return res.status(200).json(responve)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const verifyEmail = async (req, res) => {
    try {
        let { otp, email} = req.body
        let responve = await UserService.verifyEmail(email, otp)
        return res.status(200).json(responve)

    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        
        if(!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email error'
            })
        }

        let data = await UserService.loginUser(req.body)
        const {refresh_token, ...newData} = data

        res.cookie('refresh_token', refresh_token,  {
            httpOnly: true,
            secure: false,
            samsite: 'strict'
        })
        return res.status(200).json(data)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        let token = req.headers.token.split(' ')[1]
        if(!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Token is not defined'
            })
        }
        const data = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(data)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}


const updatePassword = async (req, res) => {
    try {
        const { id, currentPassword, newPassword } = req.body
        let data = await UserService.updatePassword(id, currentPassword, newPassword)

        return res.status(200).json(data)
    } catch (err) {
        return res.status(404).json({
            message: 'err from server',
            error: err
        })
    }
}


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getDetailUser,
    getAllUser,
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
    verifyEmail,
    updatePassword
}