const express = require("express");
const resumeRoute = express();
const resumeModel = require("../models/resumeModels");
const jobAppModel = require("../models/jobSelectionModels");

resumeRoute.post("/resume", async (req, res) => {
  console.log(req.body);
  if (!req.body.uid || !req.body.fname || !req.body.lname) {
    console.log("Missing required fields"); // Log the problem
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all the details" });
  }
  const id = await resumeModel.findOne({ uid: req.body.uid });
  console.log(id);
  if (id == null) {
    const resume = new resumeModel(req.body);
    const resume_Data = await resume.save();
    if (resume_Data) {
      return res
        .status(200)
        .json({ message: "Resume created successfully", resume_Data });
    } else {
      console.log("Failed to save resume"); // Log the problem
      return res.status(500).json({ result: "internal server error" });
    }
  } else {
    const resume = await resumeModel.findOneAndUpdate(
      { uid: req.body.uid },
      {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        schoolname: req.body.schoolName,
        collegename: req.body.collegeName,
        graduation: req.body.graduation,
        skills: req.body.skills,
        experience: req.body.experience,
        additional: req.body.additional,
      },
      { new: true }
    );

    if (resume) {
      console.log(resume);
      return res
        .status(200)
        .json({ message: "Resume updated successfully", resume });
    } else {
      console.log("Failed to update resume"); // Log the problem
      return res.status(500).json({ result: "internal server error" });
    }
  }
});
resumeRoute.post("/resumelist", async (req, res) => {
  console.log(req.body.uid);
  const response = await resumeModel.findOne({ uid: req.body.uid });
  console.log(response);
  return res.status(200).json({ response });
});

resumeRoute.post("/resumestatus", async (req, res) => {
  try {
    const resume = await jobAppModel.findOneAndUpdate(
      { _id: req.body._id },
      { status: req.body.status },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res
      .status(200)
      .json({ message: "Resume status updated successfully", resume });
  } catch (error) {
    console.error("Error updating resume status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = resumeRoute;
