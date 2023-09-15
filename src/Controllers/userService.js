import { Food, User, Order } from "../Models/models";
import * as env from "../../env";
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { errorCodes } from "./responce";

// verify token
export const register = async (req, res) => {
  try {
    let newUser = new User(req.body);
    if (newUser.password.length >= 8) {
      newUser.password = await Bcrypt.hash(newUser.password, 10);
      const user = await newUser.save();
      res.json(user);
    } else res.json({ message: errorCodes[2], error: errorCodes[2] }); // send error "password must be 8 or more charecters"
  } catch (err) {
    if (err.code === 11000) {
      res.json({ message: errorCodes[3], error: err }); // send error "username is already taken"
    } else if (err.name === "ValidationError") {
      res.json({ message: errorCodes[5], error: err }); // send error "Validation Error : please enter valid parametrs"
    } else {
      res.json({ message: errorCodes[4], error: err }); // send error "unexpected error"
    }
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
      res.json({ message: errorCodes[6], error: errorCodes[6] }); // send error "username or password is incorrect"
    } else {
      jwt.sign({ user }, "secret", { expiresIn: "1h" }, async (err, token) => {
        res.json({ token });
      });
    }
  } catch (err) {
    res.json({ message: errorCodes[4], error: err }); // send error "unexpected error"
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
    res.json({ message: errorCodes[7], error: errorCodes[7] }); // send error "invalid token please login"
  }
};

export const getAllUsers = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(getAllUsers.name)) {
    res.json({ message: errorCodes[1], error: errorCodes[1] }); // send error "No Permission"
  } else {
    try {
      let users = await User.find({});
      res.json(users);
    } catch (err) {
      res.json({ message: errorCodes[4], error: err }); // send error "unexpected error"
    }
  }
};


// 