const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require('config');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route      GET api/auth
// @desc       Get logged in user data
// @access     Private
router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    res.json({ user })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

// @route      POST api/auth
// @desc       Login a user
// @access     Private
router.post("/", async (req, res) => {

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ errors: [{msg: "Invalid Credentials"}] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      res.status(400).json({ errors: [{msg: "Invalid Credentials"}] });
    }

    const payload = {
      user: {id: user.id}
    }

    jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: "1h"
    }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

module.exports = router;