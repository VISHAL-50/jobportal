const express = require("express");
const userRoute = express();
const path = require("path");
const userModel = require("../models/userModel");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const cors = require("cors");
userRoute.use(cors());
const bcryptjs = require("bcrypt");
userRoute.use(express.json());
const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    throw error;
  }
};

userRoute.post("/register", upload.single("image"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;

  fs.renameSync(path, newPath);
  const { name, email, password, type } = req.body;
  try {
    if (!email || !name) {
      return res.status(422).json({ message: "All Fields are Required!" });
    } else {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists!" });
      } else {
        const spassword = await securePassword(password);

        const post = new userModel({
          name,
          email,
          password: spassword,
          image: newPath,
          type,
        });

        const postData = await post.save();

        return res
          .status(200)
          .json({ message: "Post Added successfully", postData });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// userRoute.post("/updateProfile", async (req, res) => {
//   const { name, email } = req.body;
//   console.log(email);
// });
userRoute.post("/updateProfile", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  console.log(email);
  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all the details" });
  }
  try {
    // Update the name where email matches
    const updatedUser = await userModel.findOneAndUpdate(
      { email: email }, // Match by email
      { $set: { name: name } }, // Set the new name
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    console.log(updatedUser);

    return res.status(200).json({
      success: true,
      msg: "Name updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating name:", error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});
module.exports = userRoute;
