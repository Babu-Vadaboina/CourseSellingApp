const { Router } = require("express");
const { userModel } = require("../src/config/db");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  await userModel.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
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
