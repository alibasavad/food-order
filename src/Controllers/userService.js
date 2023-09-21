import { Food, User, Order } from "../Models/models";
import * as env from "../../env";
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import {  errorResponse } from "./responce";

export const register = async (req, res) => {
  try {
    let newUser = new User(req.body);
    if (newUser.password.length >= 8) {
      newUser.password = await Bcrypt.hash(newUser.password, 10);
      const user = await newUser.save();
      res.json(user);
    } else errorResponse({ res: res, code: 2 });
  } catch (err) {
    errorResponse({ res: res, err: err });
  }
};

const auth = async (json) => {
  let user = await User.findOne({ username: json.username });
  if (user == null) return user;
  let passwordcheck = await Bcrypt.compare(json.password, user.password);
  if (passwordcheck) return user;
  else return null;
};

export const login = async (req, res) => {
  try {
    let user = await auth(new User(req.body));

    if (user == null) {
      errorResponse({ res: res, code: 6 });
    } else {
      jwt.sign({ user }, "secret", { expiresIn: "1h" }, async (err, token) => {
        res.json({ token });
      });
    }
  } catch (err) {
    errorResponse({ res: res, err: err });
  }
};

export const verify = async (req, res, next) => {
  try {
    req.token = req.headers["authorization"].split(" ")[1];
    let user = jwt.verify(req.token, "secret", (err, userdata) => {
      return userdata.user;
    });
    req.userId = user._id;
    req.username = user.username;
    req.userRole = user.Role;
    next();
  } catch (err) {
    errorResponse({ res: res, code: 7 });
  }
};

export const getAllUsers = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(getAllUsers.name)) {
    errorResponse({ res: res, code: 1 });
  } else {
    try {
      let users = await User.find({});
      res.json(users);
    } catch (err) {
      errorResponse({ res: res, err: err });
    }
  }
};
