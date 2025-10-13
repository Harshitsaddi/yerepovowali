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
        CREAYE TABLE IF NOT EXISTS orders(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCE USERS(id) ON DELETE CASCADE,
            product_name VARCHAR(255) NOT NULL,
            amount INT NOT NULL
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
<<<<<<< HEAD
>>>>>>> 775305a348afed55825d2dcbd5e4773db83ed7c4
=======
    },
    async createOrder(user_id, product_name, amount){
        const res = await pool.query("INSERT INTO orders(user_id,product,amount) VALUES($1, $2, $3) RETURNING * ",
            [user_id, product_name, amount]
        )
>>>>>>> be199dba3c14a4127365fa506beebeeca646dffe
    }
}
module.exports = User;