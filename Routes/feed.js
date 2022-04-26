const express = require("express");
const route = express.Router();
const feedController = require("../Controller/feed");

route.get("/feed", feedController.getFeed);

module.exports = route;
