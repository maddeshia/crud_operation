const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

////////////  crud operation (REST API)

// user Register
router.post("/userRegister", userController.userRegister);

// login
router.post("/userLogin", userController.login);

// get all user
router.get("/getAllUser", userController.getAllUser);

// get user by id
router.get("/getUser/:id", userController.getUserById);

// delete user by id
router.delete("/deleteUser/:id", userController.deleteUserId);

// update user by id
router.patch("/updateUser/:id", userController.updateUserById);


module.exports = router;