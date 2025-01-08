const mongoose = require("mongoose");
const date = new Date();
let day = date.getDay();
let month = date.getMonth() + 1;
let year = date.getFullYear();
const currentDate = `${day}-${month}-${year}`;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    max: 10,
    min: 4,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    default: currentDate,
  },
});

module.exports = mongoose.model("User", userSchema);
