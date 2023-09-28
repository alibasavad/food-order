import { Food, User, Order } from "../Models/models";
import * as env from "../../env";
import { errorResponse, pagination } from "./responce";
import { log } from "../../log/logger.js";
const jwt = require("jsonwebtoken");

export const makeOrder = async (req, res, next) => {
  if (!env.RolePermision[req.userRole].includes(makeOrder.name)) {
    log({
      level: "error",
      message: `user : ${req.userId} -- ${req.username} >> service : ${makeOrder.name}`,
      errorCode : 1
    });
    errorResponse({ res: res, code: 1 });
  } else {
    try {
      let foods = req.body.Food;
      if (Object.keys(foods).length === 0) {
        log({
          level: "error",
          message: `user : ${req.userId} -- ${req.username} >> service : ${makeOrder.name}`,
          errorCode : 9
        });
        errorResponse({ res: res, code: 9 });
        return 0;
      }
      for (const food of foods) {
        const check = await Food.findOne({ _id: food });
        if (check === null) {
          log({
            level: "error",
            message: `user : ${req.userId} -- ${req.username} >> service : ${makeOrder.name}`,
            errorCode : 9
          });
          errorResponse({ res: res, code: 9 });
          return 0;
        }
      }
      let order = await new Order({
        UserID: req.userId,
        Foods: foods,
      });
      order.save();
      res.json(order);
      log({
        level: "info",
        message: `user : ${req.userId} -- ${req.username} >> service : ${makeOrder.name}`,
      });
    } catch (err) {
      log({
        level: "error",
        message: `user : ${req.userId} -- ${req.username} >> service : ${makeOrder.name}`,
        error : err
      });
      errorResponse({ res: res, err: err });
    }
  }
};

export const orderHistory = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(orderHistory.name)) {
    log({
      level: "error",
      message: `user : ${req.userId} -- ${req.username} >> service : ${orderHistory.name}`,
      errorCode : 1
    });
  } else {
    try {
      const allOrders = [];
      let orders = await Order.find({ UserID: req.userId });
      for (let order of orders) {
        let foods = [];
        for (let food of order.Foods) {
          let foodInfo = await Food.findById(food);
          foods.push(foodInfo);
        }
        allOrders.push({ order: order, Foods: foods });
      }
      pagination(req, res, allOrders);
      log({
        level: "info",
        message: `user : ${req.userId} -- ${req.username} >> service : ${orderHistory.name}`,
      });
    } catch (err) {
      log({
        level: "error",
        message: `user : ${req.userId} -- ${req.username} >> service : ${makeOrder.name}`,
        error : err
      });
      errorResponse({ res: res, err: err });
    }
  }
};
