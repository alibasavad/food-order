import { User } from "../Models/models";
import * as env from "../../env";
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { log } from "../../log/logger.js";
import { errorResponse, pagination } from "./responce";
import { sendEmailConfirmation, makeSixDigitRandomString } from "./controllers";

export const register = async (req, res) => {
  try {
    const verificationCode = makeSixDigitRandomString();
    let newUser = new User({
      username: req.body.username,
      Email: req.body.Email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });
    if (newUser.password.length >= 8) {
      newUser.password = await Bcrypt.hash(newUser.password, 10);

      newUser.verificationCode = verificationCode;
      sendEmailConfirmation(verificationCode, newUser.Email);
      await newUser.save();
      const user = await User.findById(newUser._id).select([
        "username",
        "Email",
        "phoneNumber",
      ]);

      res.json({
        userInfo: user,
        message: "validate your account please",
      });

      log({
        level: "info",
        message: `user : ${user._id} -- ${user.username} >> service : ${register.name}`,
      });
    } else errorResponse({ res: res, code: 2 });
  } catch (err) {
    log({
      level: "error",

      error: err,
    });
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
        log({
          level: "info",
          message: `user : ${user._id} -- ${user.username} >> service : ${login.name}`,
        });
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
    log({
      level: "error",
      message: `user : ${req.userId} -- ${req.username} >> service : ${getAllUsers.name}`,
      errorCode: 1,
    });
    errorResponse({ res: res, code: 1 });
  } else {
    try {
      let users = await User.find({});
      pagination(req, res, users);
      log({
        level: "info",
        message: `user : ${req.userId} -- ${req.username} >> service : ${getAllUsers.name}`,
      });
    } catch (err) {
      log({
        level: "error",
        message: `user : ${req.userId} -- ${req.username} >> service : ${getAllUsers.name}`,
        error: err,
      });
      errorResponse({ res: res, err: err });
    }
  }
};
