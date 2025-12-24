const { z } = require("zod");

const purchaseSchema = z.object({
  courseId: z.string(),
});
module.exports = purchaseSchema;
