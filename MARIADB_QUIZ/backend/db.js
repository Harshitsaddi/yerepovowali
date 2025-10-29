const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12804956',
    password: 'your_password_here', 
    database: 'sql12804956'          
});


db.connect(err => {
    if (err) {
        console.error('MariaDB connection failed:', err.message);
        return;
    }
    console.log("MariaDB database connected!");
});


const createTableQuery = `
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option VARCHAR(255) NOT NULL
);
`;


db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating table:', err.message);
        return;
    }
    console.log('Table "questions" created or already exists.');
});
