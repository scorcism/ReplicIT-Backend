const mongoose = require('mongoose')
const { Schema } = mongoose;



const TechSchema = new Schema({
    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    }, password: {
        type: String,
    },
    userType: {
        type: Number,
        default: 2,
    }


}, { timestamps: true })

const Tech = mongoose.model('tech', TechSchema);
module.exports = Tech;