const { Router } = require("express");
const courseModel = require("../models/course");

const courseRouter = Router();

courseRouter.get("/", async function (req, res) {
  try {
    const courses = await courseModel.find({ published: true });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
