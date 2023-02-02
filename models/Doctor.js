const mongoose = require('mongoose')
const { Schema } = mongoose;


const DoctorSchema = new Schema({
    "mrID": {
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
        default: "requested"
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
        // manager name will come 

    },
    "updatedOn":{
        type:Date,

    },
    "updatedBy":{
        type:String,
        // mr name will come 
    },

}, { timestamps: true })

const Doctor = mongoose.model('doctor', DoctorSchema);
module.exports = Doctor;