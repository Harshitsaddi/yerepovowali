const express = require('express');
const usersRouter = require('./routes/users.route');

const app = express();
app.use(express.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
