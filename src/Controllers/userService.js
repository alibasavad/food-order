import { Food, User, Order } from "../Models/models";
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// verify token
export const verifyUser = (req, res, next) => {
    // get token from headers
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader !== undefined) {
      // split the token from "bearer"
      const bearer = bearerHeader.split(" ");
      const bearertoken = bearer[1];
      // set the token
      req.token = bearertoken;
      // verify user token
      jwt.verify(req.token, "secret", (err, userdata) => {
        if (err) {
          res.send("Headers info is invalid");
        } else {
          next();
        }
      });
    } else {
      res.send("You must register");
    }
  };
  
  export const verifyAdmin = (req, res, next) => {
    // get token from headers
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader !== undefined) {
      // split the token from "bearer"
      const bearer = bearerHeader.split(" ");
      const bearertoken = bearer[1];
      // set the token
      req.token = bearertoken;
      // verify user token
      jwt.verify(req.token, "secret", (err, userdata) => {
        if (err) {
          res.send("Headers info is invalid");
        } else if (userdata.user.Role == "admin") {
          next();
        } else {
          res.send("this page is for admin");
        }
      });
    } else {
      res.send("this page is for admin");
    }
  };
  
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
  