import { Food, User, Order } from "../Models/models";
import * as env from "../../env";
const jwt = require("jsonwebtoken");

export const makeOrder = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(makeOrder.name)) {
    res.send("No Permission");
  } else {
    try {
      let foods = Object.values(req.body);
      for (const food of foods) {
        const check = await Food.findOne({ _id: food });
      }
      let order = await new Order({
        UserID: req.userId,
        Foods: foods,
        Date: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });
      order.save();
      res.json(order);
    } catch (err) {
      res.send(err);
    }
  }
};

export const orderHistory = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(orderHistory.name)) {
    res.send("No Permission");
  } else {
    try {
      let orders = await Order.find({ UserID: req.userId });
      res.json(orders);
    } catch (err) {
      res.send(err);
    }
  }
};
