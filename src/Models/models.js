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

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    minlength: 8,
    required: true,
  },

  Role: {
    type: String,
    default: "normal-user",
  },
});

export const User = mongoose.model("User", userSchema);
export const Food = mongoose.model("Food", foodSchema);
