const express = require('express');
const router = express.Router();

let database = [];
let id = 0;

router.post('/', (req, res) => {
    let info = {
        id: id++,
        name: req.body.name,
        amount: req.body.amount
    };
    database.push(info);
    res.send(info);
});

module.exports = router;
