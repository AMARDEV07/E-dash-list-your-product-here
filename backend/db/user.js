const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
//create schema form signup user

module.exports = mongoose.model("user", userSchema);
