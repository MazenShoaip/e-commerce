import { z } from "zod";
let userLoginSchema = z.object({
    userName: z.string().min(3).optional(),
    email: z.email("invalid email").optional(),
    password: z.string().min(8),
});

export default userLoginSchema;
