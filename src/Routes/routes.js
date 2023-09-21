import * as controllers from "../Controllers/controllers";

const route = (app) => {
  app
    .route("/food")
    .get( controllers.food.getFood)

    .post(
      controllers.user.verify,
      controllers.upload,
      controllers.food.addNewFood
    );

  app
    .route("/food/:foodID")
    .get( controllers.food.getFoodByID)
    .put(
      controllers.user.verify,
      controllers.upload,
      controllers.food.updateFood
    )

    .delete(controllers.user.verify, controllers.food.deleteFood);
  app
    .route("/register")

    .post(controllers.user.register);

  app
    .route("/login")

    .post(controllers.user.login);

  app
    .route("/users")

    .get( controllers.user.verify ,controllers.user.getAllUsers);

  app
    .route("/order")

    .post(controllers.user.verify, controllers.order.makeOrder);

  app
    .route("/order/history")

    .get(controllers.user.verify, controllers.order.orderHistory);
};

export default route;
