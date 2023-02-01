const mongoose = require('mongoose')
const { Schema } = mongoose;



const MrSchema = new Schema({
    managerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manager'
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
        default: 0,
    }


}, { timestamps: true })

const Mr = mongoose.model('mr', MrSchema);
module.exports = Mr;