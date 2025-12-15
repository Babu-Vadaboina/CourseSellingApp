const express = require("express");
const userRouter = require("./routes/userrouter");

const app = express();
app.use("/api/v1/user", userRouter);
app.listen(3000);
