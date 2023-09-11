const mongoose = require('mongoose')

const statusOrderSchema = new mongoose.Schema(
    {
        type: { type: String, required: true},
        name: { type: String, unique: true},
    },
    {
        timestamps: true
    }
)

const StatusOrder = mongoose.model("StatusOrder", statusOrderSchema)
module.exports = StatusOrder