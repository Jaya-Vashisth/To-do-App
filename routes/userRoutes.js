const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const todoContoller = require("../controllers/todoController");

//user sign in and login

router.route("/signup").post(authController.signUp);

router.route("/login").post(authController.login);

// To-Do List operation
router
  .route("/tasks")
  .get(authController.protect, todoContoller.getAllTask)
  .post(authController.protect, todoContoller.createTask);

router
  .route("/tasks/:id")
  .patch(authController.protect, todoContoller.updateTask)
  .delete(authController.protect, todoContoller.deleteTask);

module.exports = router;
