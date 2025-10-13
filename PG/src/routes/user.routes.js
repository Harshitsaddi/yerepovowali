const express = require('express')
const userController = require('../controller/user.controller')

const router = express.Router();

router.post('/create-user',
userController.userCreateController
)
<<<<<<< HEAD
=======
router.post('/login', userController.loginController)
>>>>>>> 775305a348afed55825d2dcbd5e4773db83ed7c4

module.exports = router;