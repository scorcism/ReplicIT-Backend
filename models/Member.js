const mongoose = require('mongoose')
const { Schema } = mongoose;


const MemberSchema = new Schema({
    adminID:{
        type:String,
        default:"1"
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }, 
    managerID: {
        // This will be for new mr ->  if mr get the manger id here
        // and alos will be for new tech team meber -> if tech team memebr get the admin id
        type:String,
        default:null
    },
    role: {
        type: Number,
        default: 0,
        /**
         * can be 
         * 3
         * 2
         * 1
         * 0
         */
    }

}, { timestamps: true })

const Member = mongoose.model('member', MemberSchema);
module.exports = Member;