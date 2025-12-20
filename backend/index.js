const express = require("express");
require("dotenv").config();

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
