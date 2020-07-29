const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require('config');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const Like = require('../../models/Like');
const Follow = require('../../models/Follow');

// @route      GET api/users
// @desc       Register user & get token
// @access     Private
router.post("/", [
  check("email", "Email is required").isEmail().normalizeEmail(),
  check("password", "Password of at least 4 characters is required").isLength({min: 4}),
  check('password2').custom((value , { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // if there are any errors
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "User already exists",
          },
        ],
      });
    }

    user = new User ({
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
});

// @route      DELETE api/users
// @desc       Delete logged user and their profile, posts, likes, and comments
// @access     Private
router.delete("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    await Follow.deleteMany({ followGiver: profile._id });
    await Like.deleteMany({ user: req.user.id });
    await Comment.deleteMany({ user: req.user.id });
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findByIdAndDelete(req.user.id);

    res.json({ msg: "Deleted user and their data" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;