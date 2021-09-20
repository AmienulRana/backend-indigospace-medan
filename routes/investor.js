const middleware = require("../middleware");
const investor = (app) => {
  const cInvestor = require("../controllers/investor");

  app.route("/:eventId/investor").get(middleware, cInvestor.getPost);
  app.route("/:eventId/investor").post(middleware, cInvestor.addPost);
  app.route("/investor/:id").get(middleware, cInvestor.getDetailPost);
  app.route("/investor/:id").delete(middleware, cInvestor.deletePost);
};

module.exports = investor;
