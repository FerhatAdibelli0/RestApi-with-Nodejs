const express = require("express");
const route = express.Router();
const feedController = require("../Controller/feed");
const { body } = require("express-validator");

// GET /admin/post
route.get("/posts", feedController.getFeed);

// POST /admin/posts
route.post(
  "/post",
  [
    body("title").trim().isLength({ min: 7 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

module.exports = route;
