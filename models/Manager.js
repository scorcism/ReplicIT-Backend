const mongoose = require('mongoose')
const { Schema } = mongoose;



const ManagerSchema = new Schema({
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
    userType:{
        type:Number,
        default: 1,
    }
}, { timestamps: true })

const Manager = mongoose.model('manager', ManagerSchema);
module.exports = Manager;