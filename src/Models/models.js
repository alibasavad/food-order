import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = Schema(
  {
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
      enum: ["normal-user", "admin", "manager"],
    },
  },
  {
    timestamps: true,
  }
);

const orderSchema = Schema(
  {
    UserID: {
      type: Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },
    Foods: [
      {
        type: Schema.Types.ObjectId,
        ref: "foodSchema",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
export const Food = mongoose.model("Food", foodSchema);
export const Order = mongoose.model("Order", orderSchema);
