const mongoose = require("mongoose");

const selectionSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  jobid: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("jobselection", selectionSchema);
