const express = require('express');
const router = express.Router();

// Sample student data
const students = [
    { name: 'Amit Singh', roll: 'CS101', course: 'Computer Science', email: 'amit@gmail.com' },
    { name: 'Neha', roll: 'IT102', course: 'Information Technology', email: 'neha@gmail.com' },
    { name: 'Vikram Patel', roll: 'CS103', course: 'Data Science', email: 'vikram@gmail.com' },
    { name: 'Akash', roll: 'EC104', course: 'Electronics Engineering', email: 'akash@gmail.com' }
];

// GET /api/students
router.get('/students', (req, res) => {
    res.json(students);
});

module.exports = router;
