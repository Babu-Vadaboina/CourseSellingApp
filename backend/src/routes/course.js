const { Router } = require("express");
const courseModel = require("../models/course");

const courseRouter = Router();

courseRouter.get("/", async function (req, res) {
  try {
    const courses = await courseModel
      .find({ published: true })
      .select("title description price imageUrl");
    res.json({ courses });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

courseRouter.get("/:courseId", async function (req, res) {
  try {
    const course = await courseModel
      .findOne({
        _id: req.params.courseId,
        published: true,
      })
      .select("title description price imageUrl");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({ course });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = courseRouter;
