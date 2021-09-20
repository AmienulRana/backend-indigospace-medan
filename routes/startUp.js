const middleware = require("../middleware");
const cStartUp = require("../controllers/startUp");

const startUp = (app) => {
  app.route("/:eventId/startup").get(middleware, cStartUp.getPost);
  app.route("/:eventId/startup").post(middleware, cStartUp.addPost);
  app.route("/startup/:id").get(middleware, cStartUp.getDetailPost);
  app.route("/startup/:id").delete(middleware, cStartUp.deletePost);
};

module.exports = startUp;
