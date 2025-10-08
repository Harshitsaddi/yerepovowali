const pool = require('../config/db')

const createUserTable = async () =>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS USERS(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) ,
            password VARCHAR(255) NOT NULL
        )
    `)
}
createUserTable();

const User = {
    async create(name, email, password){
        const res = await pool.query (
            "INSERT INTO USERS (name, email , password) VALUES($1, $2, $3) RETURNING * ",
            [name, email, password]
        )
        return res.rows[0]
    },
    async findByEmail(email){
        const res = await pool.query("SELECT * FROM USERS WHERE email = $1",[email])
        return res.rows[0];
    }
}
module.exports = User;