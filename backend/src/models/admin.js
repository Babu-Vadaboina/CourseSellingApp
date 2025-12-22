const mongoose = require("mongoose");
const { string } = require("zod");

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
