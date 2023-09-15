import { Food, User, Order } from "../Models/models";
import * as env from "../../env";
import { errorCodes } from "./responce";
const jwt = require("jsonwebtoken");

export const makeOrder = async (req, res, next) => {
  if (!env.RolePermision[req.userRole].includes(makeOrder.name)) {
    res.json({ message: errorCodes[1], error: errorCodes[1] }); // send error "No Permission"
  } else {
    try {
      let foods = Object.values(req.body);
      for (const food of foods) {
        const check = await Food.findOne({ _id: food });
        if (check === null) {
          res.json({ message: errorCodes[9], error: errorCodes[9] }); // send error "enter valid food Id"
          return 0;
        }
      }
      let order = await new Order({
        UserID: req.userId,
        Foods: foods,
        Date: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });
      order.save();
      res.json(order);
    } catch (err) {
      res.json({ message: errorCodes[5], error: err }); // send error "Validation Error : please enter valid parametrs"
    }
  }
};

export const orderHistory = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(orderHistory.name)) {
    res.json({ message: errorCodes[1], error: errorCodes[1] }); // send error "No Permission"
  } else {
    try {
      let orders = await Order.find({ UserID: req.userId });
      res.json(orders);
    } catch (err) {
      res.json({ message: errorCodes[4], error: err }); // send error "unexpected error"
    }
  }
};
