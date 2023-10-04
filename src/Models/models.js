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

    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 11,
      maxlength: 11,
    },

    password: {
      type: String,
      minlength: 8,
      required: true,
    },

    verificationCode: {
      type: String,
    },

    Role: {
      type: String,
      default: "notVerified",
      enum: ["notVerified", "normalUser", "admin", "manager", "limited"],
    },
  },
  {
    timestamps: true,
  }
);

const orderSchema = Schema(
  {
    UserID: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "userSchema",
        required: true,
      },
    },
    Foods: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "foodSchema",
          required: true,
        },
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
