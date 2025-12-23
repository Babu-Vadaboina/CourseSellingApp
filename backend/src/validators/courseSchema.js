const { z } = require("zod");
const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().nonnegative(),
  imageUrl: z.url().optional(),
  published: z.boolean().optional(),
});
module.exports = courseSchema;
