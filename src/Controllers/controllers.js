import { Food, User } from "../Models/models";
import multer from "multer";
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Storage = multer.diskStorage({
  destination: "../../public/image",
  filename: (req, file, cb) => {
    cb(null, file.originalname + Date.now);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

export const getFood = async (req, res, next) => {
  try {
    const food = await Food.find({});
    res.json(food);
  } catch (err) {
    res.send.err;
  }
};

export const addNewFood = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        res.send(err);
      } else {
        let newfood = new Food({
          Name: req.body.Name,
          Price: req.body.Price,
          image: {
            Data: req.file.filename,
            contentType: "image/png",
          },
        });
        let food = await newfood.save();
        res.json(food);
      }
    });
  } catch (err) {
    res.send(err);
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
