
var mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
  taskName: { type: String, unique: true, required: true },
  taskDescription: { type: String, required: true },
}, { timestamps: true });

var tasks = mongoose.model("Task", taskSchema)
module.exports = tasks
