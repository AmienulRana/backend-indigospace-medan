const middleware = require("../middleware");
const cStartUp = require("../controllers/startUp");

const startUp = (app) => {
  app.route("/:eventId/startup").get(middleware, cStartUp.getStartup);
  app.route("/:eventId/startup").post(middleware, cStartUp.addStartup);
  app.route("/startup/:id").get(middleware, cStartUp.DetailStartup);
  app.route("/startup/:id").delete(middleware, cStartUp.deleteStartup);
};

module.exports = startUp;
