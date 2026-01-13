
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtOptions = require("../config/jwt");

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


const checkUser = function (userData) {
  return new Promise(function (resolve, reject) {
    User.find({ userName: userData.userName })
      .limit(1)
      .exec()
      .then((users) => {
        if (users.length == 0) {
          reject("Unable to find user " + userData.userName);
        } else {
          bcrypt.compare(userData.password, users[0].password).then((r) => {
            if (r === true) {
              resolve(users[0]);
            } else {
              reject("Incorrect password for user " + userData.userName);
            }
          });
        }
      })
      .catch((err) => {
        reject("Unable to find user " + userData.userName);
      });
  });
};

router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body || {};
    if (!userName || !password) {
      return res.status(400).json({ message: 'Missing userName or password' });
    }
    checkUser(req.body)
      .then((user) => {

        let payload = { 
                _id: user._id,
                userName: user.userName,
                
            };
            
            let token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '20m' });

            res.json({ "message": "login successful", "token": token });
           // res.json({ message: 'login successful', user: { _id: user._id, userName: user.userName } });
      })
      .catch((msg) => {
        res.status(422).json({ message: msg });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
module.exports.checkUser = checkUser;
