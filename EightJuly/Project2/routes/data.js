const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { name, rollNo, email } = req.body;

    console.log('✅ Received POST request:');
    console.log('Name:', name);
    console.log('Roll No:', rollNo);
    console.log('Email:', email);

    res.send('✅ Data received successfully!');
});

module.exports = router;
