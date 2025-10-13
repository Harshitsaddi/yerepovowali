const pool = require('../config/db')

const createUserTable = async () =>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS USERS(
            id SERIAL PRIMARY KEY,
<<<<<<< HEAD
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL
=======
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) ,
            password VARCHAR(255) NOT NULL
>>>>>>> 775305a348afed55825d2dcbd5e4773db83ed7c4
        )
    `)
}
createUserTable();

const User = {
    async create(name, email, password){
        const res = await pool.query (
<<<<<<< HEAD
            "INSERT USERS (name, email , password) VALUES($1, $2, $3) RETURNING * ",
            [name, email, password]
        )
        return res.rows[0]
=======
            "INSERT INTO USERS (name, email , password) VALUES($1, $2, $3) RETURNING * ",
            [name, email, password]
        )
        return res.rows[0]
    },
    async findByEmail(email){
        const res = await pool.query("SELECT * FROM USERS WHERE email = $1",[email])
        return res.rows[0];
>>>>>>> 775305a348afed55825d2dcbd5e4773db83ed7c4
    }
}
module.exports = User;