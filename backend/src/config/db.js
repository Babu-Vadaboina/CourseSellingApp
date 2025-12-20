// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const objectId = mongoose.Types.objectId;

// const userSchema = Schema({
//   email: { type: String, unique: true },
//   password: { type: String },
//   firstName: { type: String },
//   lastName: { type: String },
// });
// const adminSchema = Schema({
//   email: { type: String, unique: true },
//   password: { type: String },
//   firstName: { type: String },
//   lastName: { type: String },
// });
// const courseSchema = Schema({
//   title: { type: String },
//   price: { type: Number },
//   description: { type: String },
//   imageUrl: { type: String },
//   creatorId: { objectId },
// });
// const purchaseSchema = Schema({
//   userId: objectId,
//   courseId: objectId,
// });

// const userModel = mongoose.model("user", userSchema);
// const adminModel = mongoose.model("admin", adminSchema);
// const courseModel = mongoose.model("course", courseSchema);
// const purchaseModel = mongoose.model("purchase", purchaseSchema);

// module.exports = {
//   userModel,
//   adminModel,
//   courseModel,
//   purchaseModel,
// };

const mongoose = require("mongoose");
const DB_URI = process.env.MONGODB_URL_DEV;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("connected to MongoDB successfully");
  } catch (err) {
    console.error("failed to connect to DB : ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
