const middleware = require("../middleware");
const cScann = require("../controllers/scann");
const scann = (app) => {
  app.route("/scann").post(middleware, cScann.scann);
};

module.exports = scann;
