const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const { post } = require("./auth");

const privateKey = "secret";

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
});

router.post("/", async function (req, res) {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    dateCreated: req.body.dateCreated,
    dateCompleted: req.body.dateCompleted,
    completed: req.body.completed,
  });
  await post
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        id: savedPost._id,
        title: savedPost.title,
        description: savedPost.description,
        author: savedPost.author,
        dateCreated: savedPost.dateCreated,
        dateCompleted: savedPost.dateCompleted,
        completed: savedPost.completed,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res, next) {
  const posts = await Post.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ posts: posts });
});

router.delete("/:id", async function (req, res) {
  await Post.findByIdAndDelete(req.params.id)
    .where("author")
    .equals(req.payload.id)
    .then((post) => {
      if (post) {
        return res.status(200).json({
          post: post,
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.put("/:id", async function (req, res) {
  try {
    // const data = req.body;
    console.log("Print ID", req.params.id);
    // const updatedPost = await Post.findByIdAndUpdate(
    //   req.params.id,
    //   { completed: , dateCompleted: req.body.dateCompleted },
    //   { new: true }
    // );
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed, dateCompleted: req.body.dateCompleted },
      { new: true }
    );

    if (updatedPost) {
      return res.status(200).json({
        message: "Date Completed successfully updated!!",
        updatedPost: updatedPost,
      });
    } else {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
