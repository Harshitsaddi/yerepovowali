const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // apna MySQL username
    password: '2006',        // apna MySQL password
    database: 'quizdb'   // pehle MySQL me ye database create kar lena
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to MySQL database.');
    }
});

module.exports = db;
