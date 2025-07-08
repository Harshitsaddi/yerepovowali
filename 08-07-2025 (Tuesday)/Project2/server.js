// server.js
const express = require('express');
const app = express();
const dataRoutes = require('./routes/data');

app.use(express.json()); // To parse JSON body

app.get('/', (req, res) => {
    res.send('Welcome to the Student API!');
});

// Use the route
app.use('/api/data', dataRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
