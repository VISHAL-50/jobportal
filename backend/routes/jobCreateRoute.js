const express = require("express");
const jobCreateRoute = express();
// const jobCreateController = require("../controllers/jobCreateRoute");
const jobModel = require('../models/jobsModels');

jobCreateRoute.post("/jobcreate", async (req, res) => {
    console.log(req.body);
    if (!req.body.title || !req.body.description || !req.body.location) {
        console.log("Missing required fields"); // Log the problem
        return res.status(400).json({ success: false, msg: "Please fill in all the details" });
    }
    try {
        const job = new jobModel({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            shift: req.body.shift,
            type: req.body.type,
            contact: req.body.contact,
            categories: req.body.categories
        });
        const job_Data = await job.save();
        if (job_Data) {
            return res.status(200).json({ job_Data });
        } else {
            console.log("Failed to save job"); // Log the problem
            return res.status(500).json({ result: "internal server error" });
        }
    } catch (error) {
        console.error("Error creating job:", error); // Log the error
        return res.status(500).json({ result: "internal server error" });
    }
});

module.exports = jobCreateRoute;
