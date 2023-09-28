import { errorCodes } from "../../env";

export const errorResponse = ({ res: res, err: err, code: code }) => {
  if (err === undefined) {
    res.status(errorCodes[code][1]).json({
      code: code,
      message: errorCodes[code][0],
      error: errorCodes[code][0],
    }); // send error by the code
  } else if (err.name === "CastError") {
    res.status(errorCodes[9][1]).json({ message: errorCodes[9][0], error: err }); // send error "enter valid food Id"
  } else if ((err.code = 11000)) {
    res.status(errorCodes[3][1]).json({ message: errorCodes[3][0], error: err }); // send error "username is already taken"
  } else if (err.name === "ValidationError") {
    res.status(errorCodes[5][1]).json({ message: errorCodes[5][0], error: err }); // send error "Validation Error : please enter valid parametrs"
  } else {
    res.status(errorCodes[4][1]).json({ message: errorCodes[4][0], error: err }); // send error "unexpected error"
  }
};

// export const normalResponce = ({ res: res, json: json }) => {
//   res.json({ json });
// };

export const pagination = (req, res, json) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const resualtJsons = json.slice(startIndex, endIndex);

  res.json(resualtJsons);
};
