import { Food } from "../Models/models";
import multer from "multer";

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
        res.json(food)
      }
    });
  } catch (err) {
    res.send(err);
  }
};

