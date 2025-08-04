const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Fourth August API!');
}

);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
