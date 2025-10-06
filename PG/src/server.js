const express = require('express');
const { userCreateController } = require('../controller/userController');
const router = express.Router();
require('dotenv').config();

const Port  = process.env.PORT 
app.use(express.json());
app.use('/api', userRouter);

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
}
);

