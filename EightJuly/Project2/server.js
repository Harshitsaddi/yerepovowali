const express = require('express');
const app = express();
const dataRoutes = require('./routes/data');

app.use(express.json()); // Required for JSON POST body

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Student API!');
});

// ✅ This means: POST requests to /api/data will go to routes/data.js
app.use('/api/data', dataRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
