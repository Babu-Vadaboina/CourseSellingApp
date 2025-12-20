const { z } = require("zod");

const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

module.exports = {
  signupSchema,
  signinSchema,
};
