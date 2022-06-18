const express = require("express");
const app = express();
const connectDb = require("./connect/db");
const admin = require("./routes/admin");
const event = require("./routes/event");
const startUp = require("./routes/startUp");
const investor = require("./routes/investor");
const scann = require("./routes/scann");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

admin(app);
event(app);
startUp(app);
investor(app);
scann(app);
app.get("/", (req, res) => {
  res.render("index");
});

connectDb()
.then(() => {
  app.listen(PORT, () => {
    console.log("server runing in port", PORT);
  });
  console.log('connection mongodb success')
}).catch((e) => console.log(e));
