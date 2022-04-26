const express = require("express");
const bodyParser = require("body-parser");
const feedRoute = require("./Routes/feed");
// const cors = require("cors");

const app = express();

app.use(bodyParser.json());

// app.use(cors());  //Using Cors Library
// Another way to solve Cors 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,PATCH");
  res.setHeader("Access-Control-Allow_Header", "Content-Type,Authorization");
  next();
});

app.use("/admin", feedRoute);

app.listen(3000);
