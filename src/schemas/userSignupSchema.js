import {  z } from "zod";
let userSignupSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
    email: z.email("invalid email"),
});

export default userSignupSchema;
