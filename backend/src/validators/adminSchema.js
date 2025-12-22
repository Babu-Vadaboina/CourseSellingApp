const { z } = require("zod");

const adminSignupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const adminSigninSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

module.exports = { adminSignupSchema, adminSigninSchema };
