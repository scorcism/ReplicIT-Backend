const mongoose = require('mongoose')
const { Schema } = mongoose;


const DoctorSchema = new Schema({
    "mrID": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member'
    },
    "manager":{
        type:String,
        default:null
    },
    "adminID":{
        type:String,
        default:null
    },
    "name": {
        type: String
    },
    "email": {
        type: String
    },
    "status":{
        type:String,
        default:"New"
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