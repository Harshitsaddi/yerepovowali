const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true,
        unique: false, // Allow multiple scores per email
    },
    calories: {
        type: Number,
        required: true,
        min: 0
    },
    intensity: {
        type: Number,
        required: true,
        min: 1,
        max: 10 // Intensity scale from 1-10
    },
    duration: {
        type: Number,
        required: true,
        min: 1 // Duration in minutes
    },
    fitnessScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Add indexes for better query performance
scoreSchema.index({ emailId: 1, createdAt: -1 });

module.exports = mongoose.model('Score', scoreSchema);
