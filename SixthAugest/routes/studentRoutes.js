const express = require('express');
const router = express.Router();
const StudentInfo = require('../models/StudentInfo');

// Create a new student
router.post('/students', async (req, res) => {
  try {
    const student = new StudentInfo(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await StudentInfo.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
