const express = require('express');
const dotenv = require('dotenv')
const userRouter = require('./routes/user.routes');
dotenv.config()

const app = express()
app.use(express.json());
app.use('/api', userRouter)
app.use(errorHandler())

app.listen(5000,()=>{
    console.log("server is running")
})