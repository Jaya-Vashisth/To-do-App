exports.createTask = async (req, res) => {
  try {
    const task = await toDoTask.create({
      content: req.body.content,
    });

    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
};
