import * as controllers from "../Controllers/controllers";

const route = (app) => {
    app.route('/food')
    .get(controllers.getFood)

    .post(controllers.addNewFood)
};

export default route;
