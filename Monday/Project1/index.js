// server.js
const express = require('express');
const app = express();
const todoRoutes = require('./routes/todos');

app.use(express.json());

app.use('/api', todoRoutes);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
