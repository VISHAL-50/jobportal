const express = require("express");
const loginRoute = express();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

loginRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ result: "User not found" });
        }

        // Compare the provided password with the stored encrypted password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ result: "Invalid password" });
        }

        // If passwords match, respond with the user data (excluding the password)
        res.json({ user: user.toObject({ getters: true, versionKey: false }) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = loginRoute;
