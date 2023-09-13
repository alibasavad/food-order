import { Food, User, Order } from "../Models/models";
import * as env from "../../env";
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// verify token
export const register = async (req, res) => {
  try {
    let newUser = new User(req.body);
    if (newUser.password.length >= 8) {
      newUser.password = await Bcrypt.hash(newUser.password, 10);
      const user = await newUser.save();
      res.json(user);
    } else res.send("password must be more than 8 characters");
  } catch (err) {
    res.send(err);
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
      res.send("username or password is incorrect");
    } else {
      jwt.sign({ user }, "secret", { expiresIn: "1h" }, async (err, token) => {
        res.json({ token });
      });
    }
  } catch (err) {
    res.send(err);
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
    res.send("No permission(check headers)");
  }
};

export const getAllUsers = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(getAllUsers.name)) {
    res.send("No Permission");
  } else {
    try {
      let users = await User.find({});
      res.json(users);
    } catch (err) {
      res.send(err);
    }
  }
};
