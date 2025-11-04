const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    try {
        const { question, option_a, option_b, option_c, option_d, correct_option } = req.body;

        
        const sql = `
            INSERT INTO questions
            (question, option_a, option_b, option_c, option_d, correct_option)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        
        db.query(sql, [question, option_a, option_b, option_c, option_d, correct_option], (err, result) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(201).json({ message: 'Question is created' });
        });

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/',(req,res)=>{
    try{
        const sql = `SELECT * FROM questions`
        db.query(sql, (err,result)=>{
            if(err){
                return res.status(400).json({message: err.message})
            }
            console.log(result)
            res.status(200).json(result)
        })
    }catch(err){
        console.log('Internal Server Error', err)
    }
})

module.exports = router;
