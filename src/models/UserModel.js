const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, unique: true},
        password: { type: String, required: false},
        avatar: { type: String, required: false},
        isAdmin: { type: Boolean, default: false, required: true},
        phone: { type: Number, required: false},
        address: { type: String, required: false},
        access_token: { type: String, required: false},
        refresh_token: { type: String, required: false},
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)
module.exports = User