const express = require('express')
const userController = require('../controller/user.controller')

const router = express.Router();

router.post('/create-user',
userController.userCreateController
)

module.exports = router;