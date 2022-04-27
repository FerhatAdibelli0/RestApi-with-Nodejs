const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const feedRoute = require("./Routes/feed");
// const cors = require("cors");

const app = express();

app.use(bodyParser.json());

// app.use(cors());  //Using Cors Library
// Another way to solve Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTİON,GET,POST,DELETE,PUT,PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/admin", feedRoute);

app.listen(3000);
