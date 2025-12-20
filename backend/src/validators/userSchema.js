const { z } = require("zod");

const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

module.exports = {
  signupSchema,
};
