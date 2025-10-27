const pool = require('../config/db');

const createSocketTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chat_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        sender_id INT REFERENCES chat_users(id) ON DELETE CASCADE,
        receiver_id INT REFERENCES chat_users(id) ON DELETE CASCADE,
        message_text TEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

module.exports = createSocketTable;
