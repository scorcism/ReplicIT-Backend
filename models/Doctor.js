const mongoose = require('mongoose')
const { Schema } = mongoose;


const DoctorSchema = new Schema({
    "managerID": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member'
    },
    "fname": {
        type: String
    },
    "mname": {
        type: String,
    },
    "lname": {
        type: String
    },
    "phoneno": {
        tyep: Number,
    },
    "email": {
        type: String
    },
    "qualification": {
        type: String,
    },
    "specialization": {
        type: String,
    },
    "experience": {
        type: Number,
    },
    "prefeeredDomain": {
        type: String,
    },
    "city": {
        type: String,
    },
    "state": {
        type: String,
    },
    "status": {
        type: String,
        default: "request"
    },
    "createdOn":{
        type:Date,
        default: Date.now
    },
    "createdBy":{
        type:String,
        // mr name will come 
    },
    "verifiedOn":{
        type:Date,
    },
    "verifiedBy":{
        type:String,
        // mr name will come 
        default: "not Verified"
    },
    "updatedOn":{
        type:Date,
    },
    "updateBy":{
        type:String,
        // mr name will come 
    },

}, { timestamps: true })

const Doctor = mongoose.model('doctor', DoctorSchema);
module.exports = Doctor;