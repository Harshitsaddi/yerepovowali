const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '30d'
    });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, age, gender, height, weight, fitnessGoal } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: 'Name, email, and password are required' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User with this email already exists' 
            });
        }

        // Create user
        const user = new User({
            name,
            email,
            password,
            age,
            gender,
            height,
            weight,
            fitnessGoal
        });

        const savedUser = await user.save();

        // Generate token
        const token = generateToken(savedUser._id);

        res.status(201).json({
            message: 'User registered successfully',
            user: savedUser.getPublicProfile(),
            token
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Registration failed', 
            error: error.message 
        });
    }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required' 
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.json({
            message: 'Login successful',
            user: user.getPublicProfile(),
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Login failed', 
            error: error.message 
        });
    }
};

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Profile retrieved successfully',
            user: user.getPublicProfile(),
            bmi: user.calculateBMI()
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ 
            message: 'Failed to get profile', 
            error: error.message 
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const allowedUpdates = ['name', 'age', 'gender', 'height', 'weight', 'fitnessGoal', 'activityLevel', 'targetWeight'];
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ 
                message: 'Invalid update fields' 
            });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        updates.forEach(update => user[update] = req.body[update]);
        const updatedUser = await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: updatedUser.getPublicProfile(),
            bmi: updatedUser.calculateBMI()
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ 
            message: 'Failed to update profile', 
            error: error.message 
        });
    }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ 
                message: 'Current password and new password are required' 
            });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check current password
        const isCurrentPasswordValid = await user.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ 
                message: 'Current password is incorrect' 
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ 
            message: 'Failed to change password', 
            error: error.message 
        });
    }
};

// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User account deleted successfully' });

    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ 
            message: 'Failed to delete user', 
            error: error.message 
        });
    }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isActive: true })
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({
            message: 'Users retrieved successfully',
            count: users.length,
            users
        });

    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ 
            message: 'Failed to get users', 
            error: error.message 
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteUser,
    getAllUsers
};
