const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  todo: String
});

module.exports = new mongoose.model("Todo", userSchema);