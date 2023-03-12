const mongoose = require('mongoose')


const connectToMongo = ()=>{
    mongoose.connect('mongodb+srv://scor32k:scor32k@cluster0.cw5duyv.mongodb.net/project_replicit?retryWrites=true&w=majority', ()=>{
        // console.log("Connect-ED to db")
    })
}

module.exports = connectToMongo;