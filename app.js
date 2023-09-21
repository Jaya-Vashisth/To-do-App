const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const toDoTask = require("./models/toDoTask");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
app.use("/static", express.static("public"));
//middleware
app.use(express.urlencoded({ extended: true }));

const DB = process.env.DATABASE;

app.set("view engine", "ejs");

const port = 1101;

//get all the task
app.get("/", async (req, res) => {
  try {
    tasks = await toDoTask.find({});
    res.render("todo.ejs", { todoTasks: tasks });
  } catch (err) {
    res.redirect("/");
  }
});

//create the task
app.post("/", async (req, res) => {
  try {
    const task = await toDoTask.create({
      content: req.body.content,
    });

    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
});

app
  .route("/edit/:id")
  //update the task
  .get(async (req, res) => {
    const id = req.params.id;
    const tasks = await toDoTask.find({});

    res.render("todoUpdate.ejs", { todoTasks: tasks, idTask: id });
  })
  .post(async (req, res) => {
    const id = req.params.id;
    try {
      const task = await toDoTask.findByIdAndUpdate(id, {
        content: req.body.content,
      });

      res.redirect("/");
    } catch (err) {
      res.status(500, err);
      res.redirect("/");
    }
  });

//delete the task
app.route("/remove/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    await toDoTask.findByIdAndRemove(id);
    res.redirect("/");
  } catch (err) {
    res.status(500, err);
    res.redirect("/");
  }
});

//mongodb connection
mongoose.connect(DB).then((con) => {
  console.log("connected to Database");
});

//sever
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
