const express = require('express');
const http = require('http')
const path= require('path')
const{Server} = require('socket.io')

const app = express();
const server = http.createServer(app);
const port = 8080;
const io = new Server(server);


app.set('view engine', "ejs")
app.set("views",path.join(__dirname),'views')
app.use(express.static(path.join(__dirname),"public"))


app.get("/", (req,res)=>{
    res.render("index.ejs");
})

io.on("chatMessage",(socket)=>{

    console.log("user connection",socket.io)
    socket.on('connection',(msg)=>{
        io.emit("chatMessage", msg)
    })

    socket.on('disconnect',()=>{
        console.log("user disconnect")
    })
})

app.listen(port, ()=>{
    console.log("localhost is running", port)
})
