export const RolePermision = {
  "normal-user": ["makeOrder", "orderHistory", "getFood", "getFoodByID"],
  admin: [
    "makeOrder",
    "orderHistory",
    "addNewFood",
    "getFood",
    "getFoodByID",
    "deleteFood",
    "updateFood",
  ],
  manager: [
    "getAllUsers",
    "makeOrder",
    "orderHistory",
    "getFood",
    "addNewFood",
    "getFoodByID",
    "deleteFood",
    "updateFood",
  ],
};

export const PORT = 8000;
export const Database = "mongodb://127.0.0.1:27017/Food-order";

export const errorCodes = {
  1: ["No Permission" , 403],
  2: ["password must be 8 or more charecters" , 400],
  3: ["username is already taken" , 400],
  4: ["unexpected error", 400],
  5: ["Validation Error : please enter valid parametrs" , 406],
  6: ["username or password is incorrect" , 406],
  7: ["invalid token please login" , 401],
  8: ["No file was uploaded",400],
  9: ["enter valid food Id",406],
};
