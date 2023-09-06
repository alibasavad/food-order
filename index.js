import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./src/Routes/routes.js";

const express = require("express");

const app = express();
const PORT = 8000;

// mongoDB

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/Food-order", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  bodyParser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

route(app);

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
