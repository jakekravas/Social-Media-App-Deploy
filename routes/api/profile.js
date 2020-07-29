const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const Like = require('../../models/Like');
const Follow = require('../../models/Follow');

// @route      POST api/profile
// @desc       Create or update users profile
// @access     Private
router.post("/", [auth, [
  check("name", "Name is required").not().isEmpty(),
  check("name", "Name must 30 characters or less").isLength({max: 30}),
  check("username", "Username is required").not().isEmpty(),
  check("username", "Username must be 15 characters or less").isLength({max: 15}),
  check("bio", "Bio must be 80 characters or less").isLength({max: 80})
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  let profileCheck = await Profile.findOne({ username: req.body.username });
  if (profileCheck) {
    if (profileCheck.user.toString() !== req.user.id.toString()) {
      return res.status(400).json({ errors: [{msg: "Username is taken"}] });
    }
  }

  const { name, username, bio, avatar, cover } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  profileFields.name = name;
  profileFields.username = username;
  profileFields.bio = bio;
  profileFields.avatar = avatar;
  profileFields.cover = cover;
  // if (bio) profileFields.bio = bio;
  // if (avatar) profileFields.avatar = avatar;

  try {
    let profile = await Profile.findOne({user: req.user.id});

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true },
      );

      await Post.updateMany(
        { user: req.user.id },
        { $set:
          {
            name: name,
            username: username,
            avatar: avatar
          }
        },
        { new: true }
      );
  
      await Comment.updateMany(
        { user: req.user.id },
        { $set:
          {
            name: name,
            username: username,
            avatar: avatar
          }
        },
        { new: true }
      );

      return res.json({ profile });
    } else {
      profile = await new Profile(profileFields);
      await profile.save();
  
      return res.json({ profile });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      GET api/profile/me
// @desc       Get current users profile
// @access     Private
router.get("/me", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({user: req.user.id});
    let followers = await Follow.find({ followReceiver: profile._id });
    let following = await Follow.find({ followGiver: profile._id });
    if (followers) {
      profile.followers = followers;
    }
    if (following) {
      profile.following = following;
    }
    res.json({ profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      GET api/profile/:id
// @desc       Get specific users profile
// @access     Private
router.get("/:id", auth, async (req, res) => {
  try {
    let profile = await Profile.findById(req.params.id);
    res.json({ profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      GET api/profile/un/:username
// @desc       Get specific users profile by username
// @access     Private
router.get("/un/:username", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ username: req.params.username });
    let followers = await Follow.find({ followReceiver: profile._id });
    let following = await Follow.find({ followGiver: profile._id });
    if (followers) {
      profile.followers = followers;
    }
    if (following) {
      profile.following = following;
    }
    res.json({ profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      GET api/profile
// @desc       Get all profiles you're not following
// @access     Private
router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const following = await Follow.find({ followGiver: profile._id });
    let profilesToLoopThru = await Profile.find();

    let followingIDs = following.map(f => f.followReceiver.toString());

    let profiles = profilesToLoopThru.filter(prof => 
      prof._id.toString() !== profile._id.toString() && !followingIDs.includes((prof._id.toString()))
    );

    res.json({ profiles });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      GET api/profile/follow/:id
// @desc       Follow a profile
// @access     Private
router.post("/follow/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const isFollowing = await Follow.findOne({ followReceiver: req.params.id, followGiver: profile._id });

    if (isFollowing) {
      await Follow.deleteOne({ followReceiver: req.params.id, followGiver: profile._id });
      res.json({ msg: "Profile unfollowed" });
    } else {
      const newFollow = new Follow({
        followGiver: profile._id,
        followReceiver: req.params.id,
        name: profile.name,
        username: profile.username,
        avatar: profile.avatar
      });
      await newFollow.save();
      res.json({ newFollow });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;