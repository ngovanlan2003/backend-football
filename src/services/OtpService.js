const Otp = require("../models/OtpModel")
const bcrypt = require('bcrypt')

const insertOtp = ({otp, email, hashPassword, name}) => {
    return new Promise(async (resolve, reject) => {
        try {

            const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hash = await bcrypt.hash(otp, salt);

            const createOtp = await Otp.create({
                email,
                otp: hash,
                password: hashPassword,
                name
            })

            
            if(createOtp) {
                resolve({
                    data: createOtp
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const isValidOtp = async (otp, hashOtp) => {
    try {
        const isValid = await bcrypt.compare(otp, hashOtp) 

        return isValid
    } catch (error) {
        console.error(error)
    }
}
module.exports = {
    insertOtp,
    isValidOtp
}
