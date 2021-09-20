const middleware = require("../middleware");
const event = (app) => {
  const cEvent = require("../controllers/event");
  app.route("/event-page").get((req, res) => {
    res.render("pageEvent");
  });
  app.route("/event").get(middleware, cEvent.getPost);
  app.route("/event/:id").get(middleware, cEvent.getDetailPost);
  app.route("/event").post(middleware, cEvent.addEvent);
  app.route("/event/:id").delete(middleware, cEvent.deletePost);
};

module.exports = event;
