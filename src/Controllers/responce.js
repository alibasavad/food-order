import { errorCodes } from "../../env";

export const errorResponse = ({ res: res, err: err, code: code }) => {
  if (err === undefined) {
    res.json({
      code: code,
      message: errorCodes[code],
      error: errorCodes[code],
    }); // send error by the code
  } else if (err.name === "CastError") {
    res.json({ message: errorCodes[9], error: err }); // send error "enter valid food Id"
  } else if ((err.code = 11000)) {
    res.json({ message: errorCodes[3], error: err }); // send error "username is already taken"
  } else if (err.name === "ValidationError") {
    res.json({ message: errorCodes[5], error: err }); // send error "Validation Error : please enter valid parametrs"
  } else {
    res.json({ message: errorCodes[4], error: err }); // send error "unexpected error"
  }
};

export const normalResponce = ({ res: res, json: json }) => {};
