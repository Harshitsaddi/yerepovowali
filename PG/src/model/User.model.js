const pool = require('../config/db')

const createUserTable = async () =>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS USERS(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL
        )
    `)
}
createUserTable();

const User = {
    async create(name, email, password){
        const res = await pool.query (
            "INSERT USERS (name, email , password) VALUES($1, $2, $3) RETURNING * ",
            [name, email, password]
        )
        return res.rows[0]
    }
}
module.exports = User;