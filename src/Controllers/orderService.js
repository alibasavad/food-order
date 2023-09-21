import { Food, User, Order } from "../Models/models";
import * as env from "../../env";
import { errorResponse } from "./responce";
const jwt = require("jsonwebtoken");

export const makeOrder = async (req, res, next) => {
  if (!env.RolePermision[req.userRole].includes(makeOrder.name)) {
    errorResponse({ res: res, code: 1 });
  } else {
    try {
      let foods = Object.values(req.body);
      for (const food of foods) {
        const check = await Food.findOne({ _id: food });
        if (check === null) {
          errorResponse({ res: res, code: 9 });
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
      errorResponse({ res: res, err: err });
    }
  }
};

export const orderHistory = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(orderHistory.name)) {
    errorResponse({ res: res, code: 1 });
  } else {
    try {
      let orders = await Order.find({ UserID: req.userId });
      res.json(orders);
    } catch (err) {
      errorResponse({ res: res, err: err });
    }
  }
};
