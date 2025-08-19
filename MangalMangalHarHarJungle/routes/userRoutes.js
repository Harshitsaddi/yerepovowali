const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");

// Routes connected to controllers
router.post("/add", userController.addUser);
router.get("/", userController.getUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
