const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteUser,
    getAllUsers
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.use(authMiddleware); // Apply auth middleware to all routes below

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/change-password', changePassword);
router.delete('/profile', deleteUser);

// Admin routes
router.get('/', getAllUsers); // Get all users (admin only)

module.exports = router;
