const express = require("express");
const route = express.Router();
const feedController = require("../Controller/feed");

// GET /admin/post
route.get("/post", feedController.getFeed);

// POST /admin/posts
route.post("/posts", feedController.createPost);

module.exports = route;
