const express = require('express');
const http = require('http')
const path= require('path')
const{Server} = require('socket.io')

const app = express();
const port = 8080;

app.set = ('views engine', "ejs")

app.listen(port, ()=>{
    console.log("localhost is running", port)
})
