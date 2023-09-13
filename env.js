

export const RolePermision = {
    "normal-user": ["makeOrder" , "orderHistory" ,"getFood" , "getFoodByID"],
    admin: ["makeOrder" ,"orderHistory" , "addNewFood" , "getFood" , "getFoodByID" , "deleteFood" , "updateFood"],
    manager: ["getAllUsers","makeOrder" ,"orderHistory" , "getFood" , "addNewFood" , "getFoodByID" , "deleteFood" , "updateFood"],
  };
  