const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: { type: String, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
