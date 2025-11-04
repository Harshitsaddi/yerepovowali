const express = require('express')
const userController = require('../controller/user.controller')
const orderController = require('../controller/order.controller')

const router = express.Router();

router.post('/create-user',
userController.userCreateController
)
<<<<<<< HEAD
=======
router.post('/login', userController.loginController)
<<<<<<< HEAD
>>>>>>> 775305a348afed55825d2dcbd5e4773db83ed7c4
=======
router.post('/order',orderController.createOrderController)
>>>>>>> 423ed2845141a38f4acfd1005006a5083760ecd6

module.exports = router;