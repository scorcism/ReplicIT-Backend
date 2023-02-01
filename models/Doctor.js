const mongoose = require('mongoose')
const { Schema } = mongoose;



const DoctorSchema = new Schema({
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
    }

}, { timestamps: true })

const Doctor = mongoose.model('doctor', DoctorSchema);
module.exports = Doctor;