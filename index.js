import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./src/Routes/routes.js";
const express = require("express");
import * as env from "./env.js";

const app = express();

// mongoDB

mongoose.Promise = global.Promise;
mongoose.connect(env.Database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  bodyParser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

route(app);

app.listen(env.PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});