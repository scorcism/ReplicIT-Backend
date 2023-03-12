const mongoose = require('mongoose')
const { Schema } = mongoose;


const DoctorSchema = new Schema({
    "mrID": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member'
    },
    "managerID":{
        type:String,
        default:null
    },
    "adminID":{
        type:String,
        default:null
    },
    "firstname": {
        type: String
    },
    "middlename": {
        type: String,
    },
    "lastname": {
        type: String
    },
    "phone": {
        type: Number,
    },
    "email": {
        type: String
    },
    "qualification": {
        type: String,
    },
    "specialty": {
        type: String,
    },
    "experience": {
        type: Number,
    },
    'license':{
        type:String
    },
    "domain": {
        type: String,
    },
    "address": {
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
    "website":{
        type:String,
        default:null
    },
    "rejectmessage":{
        type:String,
        default:null
    }

}, { timestamps: true })

const Doctor = mongoose.model('doctor', DoctorSchema);
module.exports = Doctor;