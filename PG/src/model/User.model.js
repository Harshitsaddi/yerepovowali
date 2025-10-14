const pool = require('../config/db');

const createUserTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS USERS (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            password VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES USERS(id) ON DELETE CASCADE,
            product_name VARCHAR(255) NOT NULL,
            amount INT NOT NULL
        );
    `);
};
createUserTable();

const User = {
    async create(name, email, password) {
        const res = await pool.query(
            "INSERT INTO USERS (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        );
        return res.rows[0];
    },

    async findByEmail(email) {
        const res = await pool.query(
            "SELECT * FROM USERS WHERE email = $1",
            [email]
        );
        return res.rows[0];
    },

    async createOrder(user_id, product_name, amount) {
        const res = await pool.query(
            "INSERT INTO orders (user_id, product_name, amount) VALUES ($1, $2, $3) RETURNING *",
            [user_id, product_name, amount]
        );
        return res.rows[0];
    },

    async getUsersAndOrders() {
        const res = await pool.query(`
            SELECT 
                USERS.name, 
                USERS.email, 
                orders.product_name, 
                orders.amount
            FROM USERS 
            INNER JOIN orders 
            ON USERS.id = orders.user_id
        `);
        return res.rows;
    }
};

module.exports = User;
