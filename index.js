const express = require("express");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.listen(3000);
