import { Food, User, Order } from "../Models/models";
import { errorCodes } from "./responce";
import * as env from "../../env";
const fs = require("fs");

export const getFood = async (req, res, next) => {
  if (!env.RolePermision[req.userRole].includes(getFood.name)) {
    res.json({ message: errorCodes[1], error: errorCodes[1] }); // send error "No Permission"
  } else {
    try {
      const food = await Food.find({});
      res.json(food);
    } catch (err) {
      res.json({ message: errorCodes[4], error: err }); // send error "unexpected error"
    }
  }
};

export const addNewFood = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(addNewFood.name)) {
    res.json({ message: errorCodes[1], error: errorCodes[1] }); // send error "No Permission"
  } else if (req.file === undefined) {
    res.json({ message: errorCodes[8], error: errorCodes[8] }); // send error "No File was uploaded"
  } else {
    try {
      let newfood = new Food({
        Name: req.body.Name,
        Price: req.body.Price,
        image: req.file.filename,
      });
      let food = await newfood.save();
      res.json(food);
    } catch (err) {
      if (err.name === "ValidationError") {
        res.json({ message: errorCodes[5], error: err }); // send error "Validation Error : please enter valid parametrs"
      } else {
        res.json({ message: errorCodes[4], error: err }); // send error "unexpected error"
      }
    }
  }
};

export const getFoodByID = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(getFoodByID.name)) {
    res.json({ message: errorCodes[1], error: errorCodes[1] }); // send error "No Permission"
  } else {
    try {
      let food = await Food.findById(req.params.foodID);
      res.json(food);
    } catch (err) {
      res.json({ message: errorCodes[4], error: err }); // send error "unexpected error"
    }
  }
};

export const deleteFood = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(deleteFood.name)) {
    res.json({ message: errorCodes[1], error: errorCodes[1] }); // send error "No Permission"
  } else {
    try {
      let food = await Food.findById(req.params.foodID);
      fs.unlinkSync(`${__dirname}/../../public/image/${food.image}`);
      food.deleteOne();
      res.send("food succesfully deleted");
    } catch (err) {
      res.json({ message: errorCodes[9], error: err }); // send error "Validation Error : please enter valid parametrs"
    }
  }
};

export const updateFood = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(updateFood.name)) {
    res.json({ message: errorCodes[1], error: errorCodes[1] }); // send error "No Permission"
  } else if (req.file === undefined) {
    try {
      let food = await Food.findByIdAndUpdate(
        req.params.foodID,
        {
          Name: req.body.Name,
          Price: req.body.Price,
        },
        { new: true, useFindAndModify: false }
      );
      res.json(food);
    } catch (err) {
      res.json({ message: errorCodes[4], error: err }); // send error "unexpected error"
    }
  } else {
    try {
      let food = await Food.findById(req.params.foodID);
      if (food === null) {
        res.json({ message: errorCodes[9], error: errorCodes[9] }); // send error "enter valid food Id"
      } else {
        fs.unlinkSync(`${__dirname}/../../public/image/${food.image}`);
        food = await Food.findByIdAndUpdate(
          req.params.foodID,
          {
            Name: req.body.Name,
            Price: req.body.Price,
            image: req.file.filename,
          },
          { new: true, useFindAndModify: false }
        );
        res.json(food);
      }
    } catch (err) {
      res.json({ message: errorCodes[4], error: err }); // send error "unexpected error"
    }
  }
};
