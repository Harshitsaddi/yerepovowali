const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// In-memory array to hold student data
const students = [];

// Middleware
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.static(path.join(__dirname, 'public'))); // To serve index.html

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/data', (req, res) => {
    const { name, roll } = req.body;
    students.push({ name, roll });
    res.redirect('/data'); // Redirect to list page after submit
});

app.get('/data', (req, res) => {
    let html = `<h2>Submitted Students</h2><ul>`;
    students.forEach(s => {
        html += `<li>${s.name} - ${s.roll}</li>`;
    });
    html += `</ul><a href="/">Go Back</a>`;
    res.send(html);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
const express = require('express');
const path = require('path');


const apiRoutes = require('./routes/api');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
