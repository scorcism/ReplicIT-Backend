const mongoose = require('mongoose')
const { Schema } = mongoose;


const MemberSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    }, password: {
        type:String,
    },
    password:{
        type:String,
    },
    role:{
        type:Number,
        default: 3,
        /**
         * can be 
         * 3
         * 2
         * 1
         * 0
         */
    }

},{timestamps: true})

const Member = mongoose.model('member', MemberSchema);
module.exports = Member;