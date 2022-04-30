const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const feedRoute = require("./Routes/feed");

const MONGO_URI =
  "mongodb+srv://maxpayne35:qGBr7naSXYmEYnw@cluster0.sp51h.mongodb.net/messages?retryWrites=true&w=majority";

// const cors = require("cors");

const app = express();

app.use(bodyParser.json());

// app.use(cors());  //Using Cors Library
// Another way to solve Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/feed", feedRoute);


mongoose
  .connect(MONGO_URI)
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => console.log(err));
