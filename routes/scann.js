const middleware = require("../middleware");
const cScann = require("../controllers/scann");
const scann = (app) => {
  app.route("/scann/:eventId").post(middleware, cScann.getDetail);
};

module.exports = scann;
