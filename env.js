
export const RolePermision = {
    "normal-user": ["makeOrder" , "orderHistory" ,"getFood" , "getFoodByID"],
    admin: ["makeOrder" ,"orderHistory" , "addNewFood" , "getFood" , "getFoodByID" , "deleteFood" , "updateFood"],
    manager: ["getAllUsers","makeOrder" ,"orderHistory" , "getFood" , "addNewFood" , "getFoodByID" , "deleteFood" , "updateFood"],
  };

export const PORT = 8000;
export const Database = "mongodb://127.0.0.1:27017/Food-order" ;