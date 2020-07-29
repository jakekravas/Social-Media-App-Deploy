const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

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
// @desc       Get a specific post
// @access     Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(400).send({msg: "Post not found"});
    }

    res.json({ post });
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
    const posts = await Post.find({user: req.params.id});
    res.json({posts});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

// @route      PUT api/posts/update
// @desc       Update name and username of all posts and comments of a specific users
// @access     Private
router.put("/update", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});
    const comments = await Comment.find({user: req.user.id});

    await Post.updateMany(
      { user: req.user.id },
      { $set:
        {
          name: profile.name,
          username: profile.username,
          avatar: profile.avatar
        }
      },
      { new: true }
    );

    await Comment.updateMany(
      { user: req.user.id },
      { $set:
        {
          name: profile.name,
          username: profile.username,
          avatar: profile.avatar
        }
      },
      { new: true }
    );

    // let commentedPosts = [];
    let commentedPostsSet = new Set();
    let commentedPost;
    for (let i = 0; i < comments.length; i++) {
      commentedPost = await Post.findById(comments[i].post);
      // commentedPosts.push(commentedPost);
      commentedPostsSet.add(commentedPost._id);
      // array.from(commentedPosts);
      // for (let i = 0; i < commentedPost.comments.length; i++) {
      //   if (commentedPost.comments[i].user == req.user.id) {
      //     console.log(commentedPost);
      //   }
      // }
      // commentedPosts.push(commentedPost);
    }

    // for (let i = 0; i < )

    // res.json({ comments });
    res.json(Array.from(commentedPostsSet));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

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

    post.comments.unshift(newComment);

    await post.save();

    res.json({ post });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;