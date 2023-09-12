import { Food, User, Order } from "../Models/models";
const jwt = require("jsonwebtoken");

// const checkFoods = async (order) => {
//   for (const food of order) {
//     let check = await Food.findById(food);
//     console.log(food);
//   }
// };

export const makeOrder = async (req, res) => {
  req.token = req.headers["authorization"].split(" ")[1];
  let user = jwt.verify(req.token, "secret", (err, userdata) => {
    if (err) {
      res.send("Headers info is invalid");
    } else {
      return userdata.user;
    }
  });

  try {
    let foods = Object.values(req.body);
    for (const food of foods) {
      const check = await Food.findOne({ _id: food });
    }
    let order = await new Order({
      UserID: user._id,
      Foods: foods,
      Date : Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
    order.save();
    res.json(order);
  } catch (err) {
    res.send(err);
  }

  // res.json(user)
};

export const orderHistory = async (req, res) => {
  req.token = req.headers["authorization"].split(" ")[1];
  let user = jwt.verify(req.token, "secret", (err, userdata) => {
    if (err) {
      res.send("Headers info is invalid");
    } else {
      return userdata.user;
    }
  });

  try {
    let orders = await Order.find({ UserID: user._id });
    res.json(orders)
  } catch (err) {
    res.send(err);
  }
};
