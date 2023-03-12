const express = require('express')
const cors = require('cors');
const connectToMongo = require('./db/dbConnect');
// import * as dotenv from 'dotenv' 
const dotenv = require('dotenv')
const app = express();
const Port = 5000;
dotenv.config()
// middlewares
app.use(express.json())
app.use(cors())
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: false }));
connectToMongo()

app.get('/',(req,res)=>{
    res.send("wroking get /")
})

app.use('/api/auth',require('./routes/auth'))


app.listen(Port,()=>{
    console.log(`listening at http://localhost:${Port}`)
})








