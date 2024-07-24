const express = require("express");
const singlejobRoute = express();
const userModel = require('../models/jobsModels');

singlejobRoute.post('/singlejoblist', async (req, res) => {
    // console.log(req.body.data.id)
    try {
        const users = await userModel.find({ _id: req.body.data.id }); // Corrected query
        if (!users || users.length === 0) {
            return res.status(200).json([]);
        } else {
            res.send(users);
            // console.log(users)
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = singlejobRoute;
