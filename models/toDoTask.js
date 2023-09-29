const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  content: {
    type: String,
    required: true,
  },

  CreatedDate: {
    type: Date,
    default: Date.now(),
  },

  lastModifiedDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("ToDoTask", toDoSchema);
