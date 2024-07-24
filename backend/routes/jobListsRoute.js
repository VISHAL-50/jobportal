const express = require("express");
const jobListRoute = express();
const userModel = require("../models/jobsModels");
const user = require("../models/userModel");

jobListRoute.post("/joblist", async (req, res) => {
  try {
    const jobs = await userModel.find();

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No job data found" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// jobListRoute.post("/searchjoblist", async (req, res) => {
//   try {
//     if (!req.body.data || !req.body.data.title) {
//       res.status(400).json({ message: "Search data is required" });
//     }

//     const searchTitle = req.body.data.title.trim(); // Trim whitespace from search title
//     const jobs = await userModel.find({
//       title: { $regex: searchTitle, $options: "i" },
//     });

//     if (!jobs || jobs.length === 0) {
//       return res.status(404).json({ message: "No matching job data found" });
//     }

//     res.status(200).json({ message: "founnd", jobs });
//   } catch (error) {
//     console.error("Error fetching job list:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// jobListRoute.post("/searchjoblist", async (req, res) => {
//   try {
//     console.log(req.body.data.title.trim());

//     const searchTitle = req.body.data.title.trim(); // Trim whitespace from search title
//     const jobs = await userModel.find({
//       title: { $regex: searchTitle, $options: "i" },
//     });

//     if (!jobs || jobs.length === 0) {
//       res.status(200).json({ message: "No matching job data found" });
//     }

//     res.status(200).json({ message: "Jobs found", jobs });
//   } catch (error) {
//     console.error("Error fetching job list:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

jobListRoute.post("/searchjoblist", async (req, res) => {
  try {
    const searchTitle = req.body.data.title.trim(); // Trim whitespace from search title
    const jobs = await userModel.find({
      title: { $regex: searchTitle, $options: "i" },
    });

    if (jobs && jobs.length > 0) {
      res.status(200).json({ message: "Jobs found", jobs });
    } else {
      res.status(200).json({ message: "No matching job" });
    }
  } catch (error) {
    console.error("Error fetching job list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

jobListRoute.post("/numberofdata", async (req, res) => {
  try {
    const uniqueCategories = await userModel.distinct("categories");
    const categoryCount = uniqueCategories.length;
    const noofusers = await user.countDocuments();

    const noofjobs = await userModel.countDocuments();
    res.status(200).json({ categoryCount, noofjobs, noofusers }); // Sending data as a JSON object
  } catch (error) {
    res.status(500).json({ error: error.message }); // Sending error response if something goes wrong
  }
});

module.exports = jobListRoute;
