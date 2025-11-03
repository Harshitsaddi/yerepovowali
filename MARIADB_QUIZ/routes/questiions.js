const express = require('express');
const router = express.Router();
const db = require('../db');

// POST: Add a question
router.post('/', (req, res) => {
    try {
        const { question, option_a, option_b, option_c, option_d, correct_option } = req.body;

        const sql = 'INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_option) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [question, option_a, option_b, option_c, option_d, correct_option], (err, result) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ message: 'Question created successfully', id: result.insertId });
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = router;
