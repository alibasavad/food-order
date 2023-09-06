import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  image: {
    Data: Buffer,
    contentType: String,
  },
});

export const Food = mongoose.model("Food", foodSchema);
