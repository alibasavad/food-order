import { Food, User, Order } from "../Models/models";
import * as env from "../../env"
const fs = require("fs");

export const getFood = async (req, res, next) => {
  if (!env.RolePermision[req.userRole].includes(getFood.name)) {
    res.send("No Permission");
  } else {
  try {
    const food = await Food.find({});
    res.json(food);
  } catch (err) {
    res.send.err;
  }
}};

export const addNewFood = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(addNewFood.name)) {
    res.send("No Permission");
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
    res.send(err);
  }
}};

export const getFoodByID = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(getFoodByID.name)) {
    res.send("No Permission");
  } else {
  try {
    let food = await Food.findById(req.params.foodID);
    res.json(food);
  } catch (err) {
    res.send(err);
  }
}};

export const deleteFood = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(deleteFood.name)) {
    res.send("No Permission");
  } else {
  try {
    let food = await Food.findById(req.params.foodID);
    fs.unlinkSync(`${__dirname}/../../public/image/${food.image}`);
    food.deleteOne();
    res.send("food succesfully deleted");
  } catch (err) {
    res.send(err);
  }
}};

export const updateFood = async (req, res) => {
  if (!env.RolePermision[req.userRole].includes(updateFood.name)) {
    res.send("No Permission");
  } else {
  try {
    let food = await Food.findById(req.params.foodID);
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
    res.json(food)
  } catch (err) {
    res.send(err);
  }
}};
