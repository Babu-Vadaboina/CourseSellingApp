const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
  },
  { timestamps: true }
);

purchaseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const purchaseModel = mongoose.model("purchase", purchaseSchema);
module.exports = purchaseModel;
