const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    age: {
        type: Number,
        min: 13,
        max: 120
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        lowercase: true
    },
    height: {
        type: Number, // in cm
        min: 50,
        max: 300
    },
    weight: {
        type: Number, // in kg
        min: 20,
        max: 500
    },
    fitnessGoal: {
        type: String,
        enum: ['weight_loss', 'muscle_gain', 'maintenance', 'endurance'],
        default: 'maintenance'
    },
    activityLevel: {
        type: String,
        enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
        default: 'moderate'
    },
    targetWeight: {
        type: Number,
        min: 20,
        max: 500
    },
    profilePicture: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    // Only hash password if it's been modified or is new
    if (!this.isModified('password')) return next();
    
    try {
        // Hash password with cost of 12
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to calculate BMI
userSchema.methods.calculateBMI = function() {
    if (this.weight && this.height) {
        const heightInMeters = this.height / 100;
        return (this.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
};

// Method to get user's full profile (excluding sensitive data)
userSchema.methods.getPublicProfile = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

// Add indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', userSchema);
