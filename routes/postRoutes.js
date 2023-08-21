const express = require("express");
const PostModel = require("../models/postModel");
const auth = require("../middleware/auth");

const postRouter = express.Router();
postRouter.use(auth);

postRouter.get("/post", async (req, res) => {
  try {
    const post = await PostModel.find(req.query);
    res.status(200).send({ msg: "all the posts", post: post });
  } catch (error) {
    res.status(400).send({ msg: "unable to display post", err: error.message });
  }
});
postRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const post = await PostModel.create({ ...payload, creator: req.userId });
    res.status(200).send({ msg: "new post has been created", post: post });
  } catch (error) {
    res.status(400).send({ msg: "unable to create post", err: error });
  }
});
/*
"title": "t1",
  "body": "new1",
  "device":"Laptop",
  "no_of_comments":1
*/
postRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id });
  try {
    if (req.body.userId === post.userId) {
      const updatedPost = await PostModel.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      res
        .status(200)
        .send({ msg: "post has been updated", updated: updatedPost });
    } else {
      res.status(400).send({ msg: "unable to update" });
    }
  } catch (error) {
    res.status(400).send({ msg: "unable to update post", err: error });
  }
});

//delete
postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id });
  try {
    if (req.body.userId === post.userId) {
      await PostModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: "post has been deleted" });
    } else {
      res.status(400).send({ msg: "unable to delete" });
    }
  } catch (error) {
    res.status(400).send({ msg: "unable to delete post", err: error });
  }
});

module.exports = postRouter;
