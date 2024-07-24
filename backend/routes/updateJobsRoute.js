const express = require("express");
const updateJobRoute = express();
// const jobCreateController = require("../controllers/jobCreateRoute");
const jobModel = require('../models/jobsModels');

updateJobRoute.put("/jobupdate", async (req, res) => {
    console.log(req.body);
    const { id, title, description, salary, loc, categories } = req.body.data;
    if (!title || !description || !loc) {
        console.log("Missing required fieldsss"); // Log the problem
        return res.status(400).json({ success: false, msg: "Please fill in all the details" });
    }
    try {
        const job_Data = await jobModel.findByIdAndUpdate(id, {
            title: title,
            description: description,
            salary: salary,
            location: loc, // Assuming 'loc' corresponds to 'location' in the schema
            categories: categories
        }, { new: true });

        if (job_Data) {
            console.log(job_Data);
            return res.status(200).json({ job_Data });
        } else {
            console.log("Failed to update job"); // Log the problem
            return res.status(500).json({ result: "internal server error" });
        }
    } catch (error) {
        console.error("Error updating job:", error); // Log the error
        return res.status(500).json({ result: "internal server error" });
    }
});

module.exports = updateJobRoute;
