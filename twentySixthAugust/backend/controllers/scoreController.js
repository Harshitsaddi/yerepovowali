const postScore = async (req, res) => {
    try {
        const { emailId, calories, intensity, duration } = req.body;
        
        // Validation
        if (!emailId || !calories || !intensity || !duration) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const newScore = new Score({
            emailId,
            calories,
            intensity,
            duration,
            fitnessScore: calculateScore(calories, intensity, duration)
        });
        
        const savedScore = await newScore.save();
        res.status(201).json({ message: 'Score saved successfully', data: savedScore });
        
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all scores for a user
const getScores = async (req, res) => {
    try {
        const { emailId } = req.params;
        
        const scores = await Score.find({ emailId }).sort({ createdAt: -1 });
        res.status(200).json({ 
            message: 'Scores retrieved successfully', 
            data: scores 
        });
        
    } catch (error) {
        console.error('Error retrieving scores:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get latest score for a user
const getLatestScore = async (req, res) => {
    try {
        const { emailId } = req.params;
        
        const latestScore = await Score.findOne({ emailId })
            .sort({ createdAt: -1 });
            
        if (!latestScore) {
            return res.status(404).json({ message: 'No scores found for this user' });
        }
        
        res.status(200).json({ 
            message: 'Latest score retrieved successfully', 
            data: latestScore 
        });
        
    } catch (error) {
        console.error('Error retrieving latest score:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Calculate fitness score based on calories, intensity, and duration
const calculateScore = (calories, intensity, duration) => {
    // Fitness score formula: (calories * intensity * duration) / 100
    // You can adjust this formula based on your requirements
    const baseScore = (calories * intensity * duration) / 100;
    
    // Cap the score at 100 for better UX
    return Math.min(Math.round(baseScore), 100);
};

// Update a score
const updateScore = async (req, res) => {
    try {
        const { id } = req.params;
        const { calories, intensity, duration } = req.body;
        
        const updatedScore = await Score.findByIdAndUpdate(
            id,
            {
                calories,
                intensity,
                duration,
                fitnessScore: calculateScore(calories, intensity, duration),
                updatedAt: new Date()
            },
            { new: true }
        );
        
        if (!updatedScore) {
            return res.status(404).json({ message: 'Score not found' });
        }
        
        res.status(200).json({ 
            message: 'Score updated successfully', 
            data: updatedScore 
        });
        
    } catch (error) {
        console.error('Error updating score:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a score
const deleteScore = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedScore = await Score.findByIdAndDelete(id);
        
        if (!deletedScore) {
            return res.status(404).json({ message: 'Score not found' });
        }
        
        res.status(200).json({ message: 'Score deleted successfully' });
        
    } catch (error) {
        console.error('Error deleting score:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    postScore,
    getScores,
    getLatestScore,
    updateScore,
    deleteScore
};
