import { Food, User, Order } from "../Models/models";
import * as env from "../../env";
import { log } from "../../log/logger.js";
import { errorResponse, pagination } from "./responce";
import { sendEmailConfirmation, makeSixDigitRandomString } from "./controllers";

export const getVerificationCode = async (req, res, next) => {
  if (!env.RolePermision[req.userRole].includes(getVerificationCode.name)) {
    log({
      level: "error",
      message: `user : ${req.userId} -- ${req.username} >> service : ${getVerificationCode.name}`,
      errorCode: 1,
    });
    return errorResponse({ res: res, code: 1 });
  }
  try {
    const user = await User.findById(req.userId);
    const verificationCode = makeSixDigitRandomString();
    sendEmailConfirmation(verificationCode, user.Email);
    user.verificationCode = verificationCode;
    user.save();
    const userinfo = await User.findById(req.userId).select([
      "username",
      "Email",
      "phoneNumber",
    ]);
    res.json({
      userInfo: userinfo,
      message: "Verification Code sent to your email",
    });
    log({
      level: "info",
      message: `user : ${user._id} -- ${user.username} >> service : ${getVerificationCode.name}`,
    });
  } catch (err) {
    log({
      level: "error",
      message: `user : ${req.userId} -- ${req.username} >> service : ${verifyAccount.name}`,
      error: err,
    });
    errorResponse({ res: res, err: err });
  }
};

export const verifyAccount = async (req, res, next) => {
  if (!env.RolePermision[req.userRole].includes(verifyAccount.name)) {
    log({
      level: "error",
      message: `user : ${req.userId} -- ${req.username} >> service : ${verifyAccount.name}`,
      errorCode: 1,
    });
    return errorResponse({ res: res, code: 1 });
  }
  try {
    const user = await User.findById(req.userId);
    if (user.verificationCode === req.body.verificationCode) {
      user.Role = "normalUser";
      user.save();
      const userinfo = await User.findById(req.userId).select([
        "username",
        "Email",
        "phoneNumber",
      ]);
      res.json({
        userInfo: userinfo,
        message: "User Verificated Successfully",
      });
      log({
        level: "info",
        message: `user : ${user._id} -- ${user.username} >> service : ${verifyAccount.name}`,
      });
    } else {
      log({
        level: "error",
        message: `user : ${req.userId} -- ${req.username} >> service : ${verifyAccount.name}`,
        errorCode: 10,
      });
      errorResponse({ res: res, code: 10 });
    }
  } catch (err) {
    log({
      level: "error",
      message: `user : ${req.userId} -- ${req.username} >> service : ${verifyAccount.name}`,
      error: err,
    });
    errorResponse({ res: res, err: err });
  }
};
