const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Route import
const dataRoutes = require('./routes/data');
app.use('/api/data', dataRoutes);

// Default GET route
app.get('/', (req, res) => {
    res.send('Welcome to the Student API!');
});

app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
