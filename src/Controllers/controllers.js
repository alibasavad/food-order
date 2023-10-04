export * as food from "./foodService";
export * as user from "./userService";
export * as order from "./orderService";
export * as verification from "./verificationService";
import multer from "multer";
import * as env from "../../env";
import { log } from "../../log/logger.js";


const Storage = multer.diskStorage({
  // upload directory
  destination: `${__dirname}/../../public/image`,
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = multer({
  //upload service
  storage: Storage,
}).single("image");

export const download = (req, res) => {
  const filename = req.params.imageName;

  res.download(
    `${__dirname}/../../public/image/${filename}`,
    filename,
    (err) => {}
  );
};

export const sendEmailConfirmation = (confirmationCode, email) => {
  const mailOption = {
    from: env.email, // sender address
    to: email, // list of receivers
    subject: "Confirmation Code", // Subject line
    text: `This is Your Confirmation Code : ${confirmationCode}`, // plain text body
  };

  env.transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      log({
        level: "error",
        message: `verification email doesnt send to "${email}" address`,
        error: err,
      });
      console.log(err);
    } else {
      log({
        level: "info",
        message: `verification Email sent to "${email}" address`,
      });
      console.log("Email sent:");
    }
  });
};

export const makeSixDigitRandomString = () => {
  let randomString = "";
  for (let i = 0; i < 6; i++) {
    randomString += Math.floor(Math.random() * 10).toString();
  }
  return randomString;
};
