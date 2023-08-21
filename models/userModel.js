const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
  is_married: Boolean,
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
