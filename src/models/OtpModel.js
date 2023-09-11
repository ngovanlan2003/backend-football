const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema(
    {
        email: { type: String, required: true},
        otp: { type: String, required: true},
        time: { type: Date, default: Date.now, index: {expires: 60}},
        password: { type: String, required: true},
        name: { type: String, required: true},
    },
    {
        timestamps: true
    }
)

const Otp = mongoose.model("Otp", otpSchema)
module.exports = Otp