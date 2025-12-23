const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  adminSignupSchema,
  adminSigninSchema,
} = require("../validators/adminSchema");
const adminRouter = Router();
const adminModel = require("../models/admin");
const adminMiddleware = require("../middlewares/adminMiddleware");
const courseSchema = require("../validators/courseSchema");
const courseModel = require("../models/course");
const jwt_secret = process.env.JWT_SECRET;

adminRouter.post("/signup", async function (req, res) {
  try {
    const parsedData = adminSignupSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "invalid input",
        errors: parsedData.error.errors,
      });
    }
    const { email, password, firstName, lastName } = parsedData.data;
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const token = jwt.sign({ userId: newAdmin._id, role: "admin" }, jwt_secret);

    res.status(201).json({
      message: "signedup successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});
adminRouter.post("/signin", async function (req, res) {
  try {
    const parsedData = adminSigninSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(409).json({
        message: "Invalid input",
        errors: parsedData.error.errors,
      });
    }
    const { email, password } = parsedData.data;

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(401).send({
        message: "Invalid email or pwd",
      });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: " Invalid password",
      });
    }
    const token = jwt.sign({ adminId: admin._id, role: "admin" }, jwt_secret);

    res.status(201).json({
      message: "signedin successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: " Internal server error",
    });
  }
});
adminRouter.get("/test", adminMiddleware, (req, res) => {
  res.status(200).json({
    message: " testing admin middleware",
    adminId: req.adminId,
  });
});
adminRouter.post("/course", adminMiddleware, async function (req, res) {
  try {
    const parsedData = courseSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsedData.error.errors,
      });
    }
    const { title, description, price, imageUrl, published } = parsedData.data;
    const course = await courseModel.create({
      title,
      description,
      price,
      imageUrl,
      published: published ?? false,
      creatorId: req.adminId,
    });
    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
adminRouter.get("/courses", adminMiddleware, async function (req, res) {
  const courses = await courseModel.find({
    creatorId: req.adminId,
  });
  res.json({
    courses,
  });
});
adminRouter.post("/course-update", function (req, res) {
  res.json({
    message: "endpoint for the creating a course",
  });
});

adminRouter.put("/course-delete", function (req, res) {
  res.json({
    message: "endpoint for updating a course details",
  });
});

module.exports = adminRouter;
