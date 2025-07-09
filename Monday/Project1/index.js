const express = require('express');
const dataRouter = require('./routes/data');

const app = express();

app.use(express.json());

app.use('/api', dataRouter);
app.listen(8080, () => {
    console.log('local host 8080');
});
