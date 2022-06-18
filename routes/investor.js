const middleware = require("../middleware");
const investor = (app) => {
  const cInvestor = require("../controllers/investor");

  app.route("/:eventId/investor").get(middleware, cInvestor.getInvestor);
  app.route("/:eventId/investor").post(middleware, cInvestor.addInvestor);
  app.route("/investor/:id").get(middleware, cInvestor.DetailInvestor);
  app.route("/investor/:id").delete(middleware, cInvestor.deleteInvestor);
};

module.exports = investor;
