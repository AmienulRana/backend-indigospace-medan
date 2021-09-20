const express = require("express");
const app = express();
const qr = require("qrcode");
const connectDb = require("./connect/db");
const admin = require("./routes/admin");
const event = require("./routes/event");
const startUp = require("./routes/startUp");
const investor = require("./routes/investor");
const scann = require("./routes/scann");
const cors = require("cors");
app.use(cors());

// app.use((req, res, next) => {});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

admin(app);
event(app);
startUp(app);
investor(app);
scann(app);
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res) => {
  const url = req.body.scan;
  if (url.length === 0) res.send("Empty data!!");
  qr.toDataURL(url, (err, src) => {
    // console.log(src);
    if (err) res.send("Error");
    res.status(200).json({
      imgQrCode: src,
    });
  });
});

connectDb()
  .then(() => {
    app.listen(3000, () => {
      console.log("server runing in port 3000");
    });
  })
  .catch((e) => console.log(e));
