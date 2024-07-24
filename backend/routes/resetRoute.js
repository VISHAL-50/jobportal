const express = require("express");
const resetRoute = express();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
resetRoute.set("view engine", "ejs");
resetRoute.use(express.urlencoded({ extended: false }));
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');

const JWT_SECRET =
"hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

resetRoute.post('/reset', async (req, res) => {
    const email = req.body.email;
    console.log(email);
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ result: "email not found" });
        } else {
            const secret = JWT_SECRET + user.password;
            const token = jwt.sign(
                { email: user.email, id: user._id },
                secret,
                { expiresIn: "5m" }
            );
            const link = `http://localhost:3001/api/reset-password/${user._id}/${token}`;
            console.log(link);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vk649990@gmail.com',
                    pass: 'twolfomsegfsfcie'
                }
            });

            var mailOptions = {
                from: 'youremail@gmail.com',
                to: 'dj64909099@gmail.com',
                subject: 'password reset',
                text: link,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: error.message });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json(link);
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

resetRoute.get('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params; // Correct way to access route parameters
    console.log(id, token);

    try {
        const oldUser = await userModel.findOne({ _id: id }); // Changed User to userModel
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        
        const secret = JWT_SECRET + oldUser.password; // Changed oldUser to oldUser
        try {
            const verify = jwt.verify(token, secret);
            // res.send("Verified");
            res.render("index",{email:verify.email, status:"not verified"});
        } catch (error) {
            res.send("Not Verified");
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle any errors during database query
    }
});


const securePassword = async (password) => {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
    } catch (error) {
      throw error;
    }
  };

resetRoute.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params; // Correct way to access route parameters
    console.log(id, token);
    const {password} = req.body;

    try {
        const oldUser = await userModel.findOne({ _id: id }); // Changed User to userModel
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        
        const secret = JWT_SECRET + oldUser.password; // Changed oldUser to oldUser
        try {
            const verify = jwt.verify(token, secret);
            
             const spassword = await securePassword(password);
             await userModel.updateOne (
                {
                _id: id,
                },
                {
                $set: {
                password: spassword,
                },
                }
                );
            res.render("index",{email:verify.email, status:"verified"});

                // res.json({ status: "Password Updated" });
                // res.send("Verified");
           
        } catch (error) {
            res.send("something went wrong");
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle any errors during database query
    }
});

module.exports = resetRoute;
