
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

console.log("user model :",User);

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post("/register", async (req, res) => {
  try {
    const { userName, email, password, password2 } = req.body;

    // 1️⃣ Basic validation
    if (!email || !password || !password2) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    if (password !== password2) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2️⃣ Check if user already exists (email)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4️⃣ Create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword
    });

    // 5️⃣ Save user
    await newUser.save();

    // 6️⃣ Success response
    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error during registration"
    });
  }
});

module.exports = router;
