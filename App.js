const express = require("express");
const bodyParser = require("body-parser");
const feedRoute = require("./Routes/feed");

const app = express();

app.use(bodyParser.json());

app.use("/admin", feedRoute);

app.listen(3000);
