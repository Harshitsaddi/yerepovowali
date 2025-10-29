const mysql = require('mysql2')

const db = mysql.createConnection({
    host:'sql12.freesqldatabase.com',
    user:'sql12804956',
    password:
    databse:'sql12804956'
})

db.connect(err =>{
    if(err){
        console.error('maraiaDb connection failed', err.message)
    }
    console.log("MariaDbv database connected")
})