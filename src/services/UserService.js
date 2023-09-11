const bcrypt = require("bcrypt")
const User = require("../models/UserModel")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")
const otpGenerator = require('otp-generator')
const { insertOtp, isValidOtp } = require('./OtpService')
const { sendOtpEmail } = require('./EmailService')
const Otp = require("../models/OtpModel")


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let {name, email, password, phone, avatar} = newUser
            

            if(!name || !email || !password || !phone) {
                resolve({
                    status: 'ERR',
                    message: 'Data user is required'
                })
            }

            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)

            if(!isCheckEmail) { 
                resolve({
                    status: 'ERR',
                    message: 'Email error'
                })
            }

            let checkUser = await User.findOne({
                email: email
            })

            if(checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'User error'
                })
            }


            const hash = bcrypt.hashSync(password, 10)
            let createUser = await User.create({
                email,
                password: hash,
                name,
                phone,
                avatar
            })
            if(createUser) {
                resolve({
                    status: 'OK',
                    message: 'Create user success!',
                    data: createUser
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = (userId, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await User.findOne({
                _id: userId
            })

            if(!checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'User error'
                })
            }

            let updateUser = await User.findByIdAndUpdate(userId, user, { new: true })
            if(updateUser) {
                resolve({
                    status: 'OK',
                    message: 'UpdateUser user success!',
                    data: updateUser
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUser = (userId, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await User.findOne({
                _id: userId
            })

            if(!checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'User error'
                })
            }

            let deleteUser = await User.findByIdAndDelete(userId)
            if(updateUser) {
                resolve({
                    status: 'OK',
                    message: 'Delete user success!',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getDetailUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let getDetailUser = await User.findOne({
                _id: userId
            })

            if(!getDetailUser) {
                resolve({
                    status: 'ERR',
                    message: 'User error'
                })
            }

            resolve({
                statusText: 'OK',
                message: 'Get detail user success!',
                data: getDetailUser
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getAllUser = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let totalUser = await User.count()
            let getAllUser = await User.find().limit(limit).skip(limit * page)
            if(getAllUser) {
                resolve({
                    status: 'OK',
                    message: 'Get all user success!',
                    data: getAllUser,
                    pageCurrent: +page + 1,
                    totalUser: totalUser,
                    maxPage: Math.ceil(totalUser / limit)
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const registerUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let {name, email, password, confirmPassword} = newUser
            

            if(!name || !email || !password || !confirmPassword) {
                resolve({
                    status: 'ERR',
                    message: 'Data user is required'
                })
            }

            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)

            if(!isCheckEmail) { 
                resolve({
                    status: 'ERR',
                    message: 'Email error'
                })
            }

            if(password !== confirmPassword) {
                resolve({
                    status: 'ERR',
                    message: 'Confirm Password error'
                })
            }

            let checkUser = await User.findOne({
                email: email
            })

            if(checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'User is exits'
                })
            }

            const otp = otpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            })

            const hashPassword = await bcrypt.hashSync(password, 10)

            await insertOtp({otp, email, hashPassword, name})
            let sendEmail = await sendOtpEmail({email, otp})

            resolve({
                status: 'OK',
                message: 'Create otp success from resgister',
                otp,
                sendEmail
            })
        } catch (error) {
            reject(error)
        }
    })
}

const verifyEmail = (email, otp) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOtp = await Otp.find({
                email
            })

            if(!checkOtp.length) {
                resolve({
                    status: 'ERR',
                    message: 'Email and otp not exist'
                })
            }

            const lastOtp = checkOtp[checkOtp.length - 1]

            const isValid = await isValidOtp(otp, lastOtp.otp)
        
            if(!isValid) {
                resolve({
                    status: 'ERR',
                    message: 'Verify email ERROR'
                })
            }

            if(isValid && email === lastOtp.email) {
                const newUser = await User.create({
                    email,
                    name: lastOtp.name,
                    password: lastOtp.password,
                })

                if(newUser) {
                    await Otp.deleteMany({
                        email
                    })
                }

                resolve({
                    status: 'OK',
                    message: "Create user success",
                    data: newUser
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {email, password} = userLogin

            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }else {
                const comparePassword = await bcrypt.compareSync(password, checkUser.password)

                if(!comparePassword) {
                    resolve({
                        status: 'ERR',
                        message: 'Password error',
                    })
                }else {

                    const access_token = await generalAccessToken({
                        id: checkUser.id,
                        isAdmin: checkUser.isAdmin
                    })

                    const refresh_token = await generalRefreshToken({
                        id: checkUser.id,
                        isAdmin: checkUser.isAdmin
                    })
                     
                    resolve({
                        status: 'OK',
                        message: 'Login success',
                        access_token,
                        refresh_token
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}


const updatePassword = (id, currentPassword, newPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!id || !currentPassword || !newPassword) {
                resolve({
                    status: 'ERR',
                    message: 'Data user is null'
                })
            }

            const checkUser = await User.findOne({
                _id: id
            })

            if(!checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }else {
                const compareCurrentPassword = await bcrypt.compareSync(currentPassword, checkUser.password)
                if(!compareCurrentPassword) {
                    resolve({
                        status: 'ERR',
                        message: 'Verify password current is false',
                    })
                }

                const comparePassword = bcrypt.compareSync(newPassword, checkUser.password)

                if(comparePassword) {
                    resolve({
                        status: 'ERR',
                        message: 'Nothing changes',
                    })
                }else {
                    const hash = bcrypt.hashSync(newPassword, 10)

                    const update = await User.findByIdAndUpdate(id, {
                        'password': hash
                    }, { new: true })
                     
                    resolve({
                        status: 'OK',
                        message: 'Update password success',
                        update
                    })
                }
            }
            

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getDetailUser,
    getAllUser,
    registerUser,
    loginUser,
    verifyEmail,
    updatePassword
}