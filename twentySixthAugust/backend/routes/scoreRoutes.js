const express = require('express');
const router = express.Router();
const { 
    postScore, 
    getScores, 
    getLatestScore, 
    updateScore, 
    deleteScore 
} = require('../controllers/scoreController');

// POST /api/scores - Create a new fitness score
router.post('/', postScore);

// GET /api/scores/:emailId - Get all scores for a user
router.get('/:emailId', getScores);

// GET /api/scores/:emailId/latest - Get latest score for a user
router.get('/:emailId/latest', getLatestScore);

// PUT /api/scores/:id - Update a specific score
router.put('/:id', updateScore);

// DELETE /api/scores/:id - Delete a specific score
router.delete('/:id', deleteScore);

module.exports = router;
