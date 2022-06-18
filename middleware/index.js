const jwt = require("jsonwebtoken");
const index = (req, res, next) => {
  if (req.headers["authorization"] !== undefined) {
    let token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(201).json({
        error:true,
        auth: false,
        message: "No Access Token",
      });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(201)
          .json({ error:true, auth: false, message: "Invalid Token" });
      }
      req.data = decoded;
      next();
    });
  } else {
    return res.status(201).json({
      error:true,
      auth: false,
      message: "No Access Token",
    });
  }
};

module.exports = index;
