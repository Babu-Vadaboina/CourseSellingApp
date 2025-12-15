const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", function (req, res) {
  res.json({
    message: "user signedup successfully",
  });
});
userRouter.post("/signin", function (req, res) {
  res.json({
    message: "user signed in successfully",
  });
});

module.exports = userRouter;
