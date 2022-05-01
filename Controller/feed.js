const { validationResult } = require("express-validator");
const Post = require("../Model/post");
const fs = require("fs");
const path = require("path");

exports.getFeed = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: "Successfully fetched",
        posts: posts,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path.replace("\\", "/");

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Validation failed check your inputs");
    err.statusCode = 422;
    throw err;
  }
  if (!req.file) {
    const error = new Error("No found image");
    error.statusCode = 422;
    throw error;
  }

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: { name: "Ferhat" },
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post is successfully",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Post is not found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Post is fecthed successfully",
        post: post,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Validation failed check your inputs");
    err.statusCode = 422;
    throw err;
  }
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path.replace("\\", "/");
  }
  if (!imageUrl) {
    const error = new Error("imageUrl is not found");
    error.statusCode = 404;
    throw error;
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Post is not found");
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Successfully updated", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = (filePath) => {
  const fileDir = path.join(__dirname, "..", filePath);
  fs.unlink(fileDir, (err) => console.log(err));
};
