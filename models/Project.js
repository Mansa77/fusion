let mongoose = require("mongoose");

let ProjectSchema = new mongoose.Schema({
  pseudo: String,
  description: String
});

var Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
