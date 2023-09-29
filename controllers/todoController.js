const toDoTask = require("./../models/toDoTask");
const Todo = require("./../models/toDoTask");
const User = require("./../models/usermodel");

//to create a new task
exports.createTask = async (req, res, next) => {
  try {
    const newToDo = await toDoTask.create({
      content: req.body.content,
      user: req.user.id,
      lastModifiedDate: Date.now(),
    });

    res.status(200).json({
      status: "success",
      data: {
        newToDo,
      },
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//get all task for the user
exports.getAllTask = async (req, res, next) => {
  try {
    const todos = await toDoTask
      .find({
        user: req.user.id,
      })
      .sort({ data: -1 });

    res.json(todos);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//update the existing task
exports.updateTask = async (req, res, next) => {
  try {
    const content = req.body.content;

    if (!content)
      return res.status(400).json({
        status: "fail",
        message: "Task field is required to edit",
      });

    const todo = await toDoTask.findByIdAndUpdate(
      req.params.id,
      { content: content, lastModifiedDate: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//delete the task
exports.deleteTask = async (req, res, next) => {
  try {
    await toDoTask.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
