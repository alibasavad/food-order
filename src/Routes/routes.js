import * as controllers from "../Controllers/controllers";

const route = (app) => {
  app
    .route("/food")
    .get(controllers.getFood)

    .post(controllers.addNewFood);

  app
    .route("/register")

    .post(controllers.register);

  app
    .route("/login")

    .post(controllers.login);
};

export default route;
