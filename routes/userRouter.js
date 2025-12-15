const { Router } = require("express");
const userRouter = Router();

userRouter.get("/preview", function (req, res) {
  res.json({
    message: "userRouter Endpoint",
  });
});

module.exports = userRouter;
