const express = require("express");
const route = express.Router();
const feedController = require("../Controller/feed");

// GET /admin/post
route.get("/posts", feedController.getFeed);

// POST /admin/posts
route.post("/post", feedController.createPost);

module.exports = route;
