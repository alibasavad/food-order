import { Food, User, Order } from "../Models/models";
import { errorResponse ,pagination } from "./responce";
import * as env from "../../env";
const fs = require("fs");

export const getFood = async (req, res, next) => {
  try {
    const food = await Food.find({});
    pagination(req , res , food) 
  } catch (err) {
    errorResponse({ res: res, err: err });
  }
};

export const addNewFood = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(addNewFood.name)) {
    errorResponse({ res: res, code: 1 });
  } else if (req.file === undefined) {
    errorResponse({ res: res, code: 8 });
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
      fs.unlinkSync(`${__dirname}/../../public/image/${req.file.filename}`);
      errorResponse({ res: res, err: err });
    }
  }
};

export const getFoodByID = async (req, res) => {
  try {
    let food = await Food.findById(req.params.foodID);
    res.json(food);
  } catch (err) {
    errorResponse({ res: res, err: err });
  }
};

export const deleteFood = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(deleteFood.name)) {
    errorResponse({ res: res, code: 1 });
  } else {
    try {
      let food = await Food.findById(req.params.foodID);
      fs.unlinkSync(`${__dirname}/../../public/image/${food.image}`);
      food.deleteOne();
      res.send("food succesfully deleted");
    } catch (err) {
      errorResponse({ res: res, err: err });
    }
  }
};

export const updateFood = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(updateFood.name)) {
    errorResponse({ res: res, code: 1 });
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
      errorResponse({ res: res, err: err });
    }
  } else {
    try {
      let food = await Food.findById(req.params.foodID);
      if (food === null) {
        errorResponse({ res: res, code: 9 });
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
      errorResponse({ res: res, err: err });
    }
  }
};
