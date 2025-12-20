const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupSchema, signinSchema } = require("../validators/userSchema");
const userModel = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");
const userRouter = Router();
const jwt_secret = process.env.JWT_SECRET || "HELLO_ALL_HI";

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
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        message: " user already exists ",
      });
    }

    //hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    //saving the user data in db
    const user = await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    const token = jwt.sign(
      {
        userId: user._id,
      },
      jwt_secret
    );
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
userRouter.post("/signin", async function (req, res) {
  try {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "Invalid inputs",
        errors: parsedData.error.errors,
      });
    }
    const { email, password } = parsedData.data;
    //finding the user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    //compare the password
    const pwdMatch = await bcrypt.compare(password, user.password);
    if (!pwdMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      jwt_secret
    );

    res.status(200).json({
      message: "user signed in successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
userRouter.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "middleware auth working",
    userId: req.userId,
  });
});

module.exports = userRouter;
