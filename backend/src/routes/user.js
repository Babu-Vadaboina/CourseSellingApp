const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupSchema = require("../validators/userSchema");
const { userModel } = require("../models/user");
const userRouter = Router();
const jwt_secret = process.env.JWT_SECRET;

userRouter.post("/signup", async function (req, res) {
  try {
    //validating inp through zod
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "invalid input",
        errors: parsedData.error.errors,
      });
    }

    const { email, password, firstName, lastName } = parsedData.data;

    //check if user exist already
    const existingUser = await userModel.find({ email: email });
    if (existingUser) {
      return res.status(409).json({
        message: " user already exists ",
      });
    }

    //hashing the password using bcrypt
    const hashedPassword = bcrypt.hash(password, 10);
    //saving the user data in db
    const user = await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    const token = jwt.sign({
      userId: user._id,
      jwt_secret,
    });
    res.status(201).json({
      message: "user signedup successfully",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
userRouter.post("/signin", function (req, res) {
  res.json({
    message: "user signed in successfully",
  });
});

module.exports = userRouter;
