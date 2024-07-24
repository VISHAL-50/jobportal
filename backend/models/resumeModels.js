const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  schoolname: {
    type: String,
  },
  collegename: {
    type: String,
  },
  graduation: {
    type: String,
  },
  experience: {
    type: String,
  },
  skills: {
    type: String,
  },
  additional: {
    type: String,
  },
});

module.exports = mongoose.model("resume", resumeSchema);
