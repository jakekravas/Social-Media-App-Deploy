const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const Like = require('../../models/Like');
const Follow = require('../../models/Follow');

// @route      POST api/posts
// @desc       Create a post
// @access     Private
router.post("/", [auth, [
  check("text", "Post can't be empty").not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    res.status(400).json({ errors: errors.array() })
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const newPost = await new Post({
      user: profile.user,
      name: profile.name,
      username: profile.username,
      avatar: profile.avatar,
      text: req.body.text
    });

    const post = await newPost.save();

    res.json({ post });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      GET api/posts/:id
// @desc       Get a specific post and its comments and likes
// @access     Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comments = await Comment.find({ post: post._id });
    const likes = await Like.find({ post: post._id });

    if (!post) {
      res.status(400).send({msg: "Post not found"});
    }

    res.json({ post, comments, likes });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId"){
      res.status(404).send({msg: "Post not found"});
    } else {
      res.status(500).send("Server error");
    }
  }
})

// @route      GET api/posts/likes/:id
// @desc       Get all likes of a specific post
// @access     Private
router.get("/likes/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const likes = await Like.find({ post: post._id });

    if (!post) {
      res.status(400).send({msg: "Post not found"});
    }

    res.json({ likes });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId"){
      res.status(404).send({msg: "Post not found"});
    } else {
      res.status(500).send("Server error");
    }
  }
})

// @route      GET api/posts/user/:id
// @desc       Get all posts of a specific user
// @access     Private
router.get("/user/:id", auth, async (req, res) => {
  try {
    let posts = await Post.find({user: req.params.id}).sort({ date: -1 });
    for (let i = 0; i < posts.length; i++) {
      let likes = await Like.find({ post: posts[i]._id });
      if (likes) {
        posts[i].likes = likes;
      }
    }
    res.json({posts});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

// @route      GET api/posts/username/:id
// @desc       Get all posts of a specific user by username
// @access     Private
router.get("/username/:id", auth, async (req, res) => {
  try {
    let posts = await Post.find({username: req.params.id}).sort({ date: -1 });
    for (let i = 0; i < posts.length; i++) {
      let likes = await Like.find({ post: posts[i]._id });
      if (likes) {
        posts[i].likes = likes;
      }
    }
    res.json({posts});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

// @route      GET api/posts/user/:id
// @desc       Get all posts of a specific profile
// @access     Private
router.get("/profile/:username", auth, async (req, res) => {
  try {
    let posts = await Post.find({username: req.params.username}).sort({ date: -1 });
    for (let i = 0; i < posts.length; i++) {
      let likes = await Like.find({ post: posts[i]._id });
      if (likes) {
        posts[i].likes = likes;
      }
    }
    res.json({posts});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

// @route      GET api/posts/following
// @desc       Get all posts of profiles a user is following
// @access     Private
router.get("/following/all", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const following = await Follow.find({ followGiver: profile._id });
    const profilesFollowing = [];
    for (let i = 0; i < following.length; i++) {
      let pf = await Profile.findById(following[i].followReceiver);
      profilesFollowing.push(pf.user.toString());
    }
    const posts = await Post.find();
    const postsOfFollowing = posts.filter(post => (profilesFollowing.includes(post.user.toString())));

    for (let i = 0; i < postsOfFollowing.length; i++) {
      let likes = await Like.find({ post: postsOfFollowing[i]._id });
      if (likes) {
        postsOfFollowing[i].likes = likes;
      }
    }

    res.json({ postsOfFollowing });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

// @route      DELETE api/posts/:id
// @desc       Delete a post and its likes
// @access     Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({msg: "Post not found"});
    }

    // Check user
    if (post.user.toString() !== req.user.id){
      return res.status(401).send({msg: "User not authorized"});
    };

    await Like.deleteMany({post: req.params.id});
    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId"){
      res.status(404).send({msg: "Post not found"});
    } else {
      res.status(500).send("Server error");
    }
  }
});

// @route      POST api/posts/comment/:id
// @desc       Comment on a post
// @access     Private
router.post("/comment/:id", [auth, [
  check("text", "Comment cannot be empty").not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const profile = await Profile.findOne({ user: req.user.id });
    const post = await Post.findById(req.params.id);

    const newComment = new Comment({
      user: user._id,
      post: post._id,
      text: req.body.text,
      name: profile.name,
      username: profile.username,
      avatar: profile.avatar
    });

    await newComment.save();

    res.json({ post });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      DELETE api/posts/comment/:id
// @desc       Delete a comment
// @access     Private
router.delete("/comment/:commentid", auth, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentid);
    res.json({ msg: "Comment deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      POST api/posts/like/:id
// @desc       Like/Unlike a post
// @access     Private
router.post("/like/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const post = await Post.findById(req.params.id);
    const like = await Like.findOne({ post: req.params.id, user: req.user.id });

    if (like) {
      await Like.deleteOne({ post: req.params.id, user: req.user.id });
      res.json({ msg: "Post unliked" });
    } else {
      const newLike = new Like({
        user: req.user.id,
        post: post._id,
        name: profile.name,
        username: profile.username,
        avatar: profile.avatar
      });
  
      await newLike.save();
      res.json({ newLike });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;