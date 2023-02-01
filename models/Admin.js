const mongoose = require('mongoose')
const { Schema } = mongoose;


const AdminSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    }, password: {
        type:String,
    },
    userType:{
        type:Number,
        default: 3,
    }

},{timestamps: true})

const Admin = mongoose.model('admin', AdminSchema);
module.exports = Admin;