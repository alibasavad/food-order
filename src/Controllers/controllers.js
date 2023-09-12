import { Food, User, Order } from "../Models/models";
export * as food from "./foodService";
export * as user from "./userService";
export * as order from "./orderService";
import multer from "multer";
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Storage = multer.diskStorage({
  destination: `${__dirname}/../../public/image`,
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = multer({
  storage: Storage,
}).single("image");
