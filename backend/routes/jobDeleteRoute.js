const express = require("express");
const mongoose = require('mongoose');

const jobDeleteRoute = express();
const userModel = require('../models/jobsModels');

jobDeleteRoute.delete('/jobdelete', async (req, res) => {
    try {
      console.log(req.body.id);
      const _id = new mongoose.Types.ObjectId(req.body.id);
        const deletedJob = await userModel.findByIdAndDelete({_id});
        if (!deletedJob) {
          return res.status(404).json({ success: false, msg: "Job not found" });
        }
        return res.status(200).json({ success: true, msg: "Job deleted successfully" });
      } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
      }
});

module.exports = jobDeleteRoute;
