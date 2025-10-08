const express = require('express')
const userController = require('../controller/user.controller')

const router = express.Router();

router.post('/create-user',
userController.userCreateController
)
router.post('/login', userController.loginController)

module.exports = router;