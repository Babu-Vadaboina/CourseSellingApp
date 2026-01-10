const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupSchema, signinSchema } = require("../validators/userSchema");
const userModel = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");
const purchaseSchema = require("../validators/purchaseSchema");
const courseModel = require("../models/course");
const purchase = require("../models/purchase");
const purchaseModel = require("../models/purchase");
const { boolean } = require("zod");
const userRouter = Router();
const jwt_secret = process.env.JWT_SECRET || "HELLO_ALL_HI";
const crypto = require("crypto");
const razorpay = require("../config/razorpay");

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

// userRouter.post("/purchase", authMiddleware, async (req, res) => {
//   try {
//     const parsedData = purchaseSchema.safeParse(req.body);
//     if (!parsedData.success) {
//       return res.status(401).json({
//         message: " Invalid purchase input",
//         errors: parsedData.error.errors,
//       });
//     }
//     const { courseId } = parsedData.data;

//     const course = await courseModel.findOne({
//       _id: courseId,
//     });
//     if (!course) {
//       return res.status(404).json({
//         message: "Course not found",
//       });
//     }
//     await purchaseModel.create({
//       userId: req.userId,
//       courseId,
//     });
//     res.status(201).json({
//       message: "Course purchased successfully",
//     });
//   } catch (err) {
//     if (err.code == 11000) {
//       return res.status(409).json({
//         message: "course already purchased",
//       });
//     }
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// });

userRouter.get("/purchases", authMiddleware, async (req, res) => {
  try {
    const purchases = await purchaseModel
      .find({
        userId: req.userId,
      })
      .populate("courseId");

    const courses = purchases.map((p) => p.courseId).filter(Boolean);

    return res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

userRouter.post("/purchase/verify", authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }
    await purchaseModel.create({
      userId: req.userId,
      courseId,
    });
    res.json({
      message: "Payment successful, course unlocked",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Course already purchased",
      });
    }

    res.status(500).json({
      message: "Payment verification failed",
    });
  }
});
module.exports = userRouter;

userRouter.post("/purchase/order", authMiddleware, async (req, res) => {
  const { courseId } = req.body;

  const course = await courseModel.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const order = await razorpay.orders.create({
    amount: course.price * 100,
    currency: "INR",
  });

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    razorpayKey: process.env.RAZORPAY_KEY_ID,
  });
});
