const { Router } = require("express");

const adminRouter = Router();

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "signedup successfully",
  });
});
adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "signedin successfully",
  });
});

adminRouter.get("/course", function (req, res) {
  res.json({
    message: "endpoint for getting course details",
  });
});

adminRouter.post("/course", function (req, res) {
  res.json({
    message: "endpoint for the creating a course",
  });
});

adminRouter.put("/course", function (req, res) {
  res.json({
    message: "endpoint for updating a course details",
  });
});

module.exports = adminRouter;
