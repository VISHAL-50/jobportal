const express = require("express");
const jobselectionRoute = express();
// const jobCreateController = require("../controllers/jobCreateRoute");
const jobSelectionModel = require("../models/jobSelectionModels");

jobselectionRoute.post("/jobselection", async (req, res) => {
  console.log(req.body);
  if (!req.body.jobId && !req.body.userId) {
    console.log("Missing required fields"); // Log the problem
    return res
      .status(400)
      .json({ success: false, msg: "some error while sending job id" });
  }
  const response = await jobSelectionModel.findOne({
    userid: req.body.userId,
    jobid: req.body.jobId,
  });
  console.log(response);
  if (response == null) {
    const selection = new jobSelectionModel({
      userid: req.body.userId,
      jobid: req.body.jobId,
      title: req.body.title,
      description: req.body.description,
    });
    const selection_Data = await selection.save();
    if (selection_Data) {
      return res.status(200).json({ result: "Applied successfully" });
    } else {
      console.log("Failed to save job"); // Log the problem
      return res.status(500).json({ result: "internal server error" });
    }
  } else {
    return res.status(200).json({ result: "Already applied" });
  }
});

jobselectionRoute.post("/jobapplylist", async (req, res) => {
  try {
    if (req.body.id) {
      // If a user ID is provided in the request body, find job applications by user ID
      const joblist = await jobSelectionModel.find({ userid: req.body.id });
      //   console.log(joblist);
      return res.status(200).json(joblist);
    } else {
      // If no user ID provided, fetch all job applications
      const joblist = await jobSelectionModel.find();
      //  console.log(joblist);
      return res.status(200).json(joblist);
    }
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = jobselectionRoute;
