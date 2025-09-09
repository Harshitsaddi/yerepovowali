const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register); // optional: disable open register in prod
router.post('/login', login);

module.exports = router;
