const express = require('express');
const {userController} = require('../controller/userController')
const router = express.Router();

router.post('/create-user',
     userController.userCreateController);

module.exports = router;