const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, default: null },
  last_name: { type: String, required: true, default: null },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);
