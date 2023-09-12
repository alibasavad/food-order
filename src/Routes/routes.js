import * as controllers from "../Controllers/controllers";

const route = (app) => {
  app
    .route("/food")
    .get(controllers.user.verifyUser, controllers.food.getFood)

    .post(
      controllers.user.verifyAdmin,
      controllers.upload,
      controllers.food.addNewFood
    );

  app
    .route("/food/:foodID")
    .get(controllers.user.verifyUser, controllers.food.getFoodByID)
    .put(
      controllers.user.verifyAdmin,
      controllers.upload,
      controllers.food.updateFood
    )

    .delete(controllers.user.verifyAdmin, controllers.food.deleteFood);
  app
    .route("/register")

    .post(controllers.user.register);

  app
    .route("/login")

    .post(controllers.user.login);

  app
    .route("/order")

    .post(controllers.user.verifyUser, controllers.order.makeOrder);

  app
    .route("/order/history")

    .get(controllers.user.verifyUser, controllers.order.orderHistory);
};

export default route;
