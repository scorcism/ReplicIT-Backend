const express = require('express')
const cors = require('cors');
const connectToMongo = require('./db/dbConnect');

const app = express();
const Port = 5000;

// middlewares
app.use(express.json())
app.use(cors())

connectToMongo()

app.get('/',(req,res)=>{
    res.send("wroking get /")
})

app.use('/api/auth',require('./routes/auth'))


app.listen(Port,()=>{
    console.log(`listening at http://localhost:${Port}`)
})








