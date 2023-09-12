import * as controllers from "../Controllers/controllers";

const route = (app) => {
  app
    .route("/food")
    .get(controllers.verifyUser, controllers.food.getFood)

    .post(
      controllers.verifyAdmin,
      controllers.upload,
      controllers.food.addNewFood
    );

  app
    .route("/food/:foodID")
    .get(controllers.verifyUser, controllers.food.getFoodByID)
    .put(
      controllers.verifyAdmin,
      controllers.upload,
      controllers.food.updateFood
    )

    .delete(controllers.verifyAdmin, controllers.food.deleteFood);
  app
    .route("/register")

    .post(controllers.register);

  app
    .route("/login")

    .post(controllers.login);

  app
    .route("/order")

    .post(controllers.verifyUser, controllers.makeOrder);

  app
    .route("/order/history")

    .get(controllers.verifyUser);
};

export default route;
