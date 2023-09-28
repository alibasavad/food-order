export * as food from "./foodService";
export * as user from "./userService";
export * as order from "./orderService";
import multer from "multer";

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
