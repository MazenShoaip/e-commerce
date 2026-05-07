import { z } from "zod";
let userLoginSchema = z.object({
    // userName: z.string().min(3),
    email: z.email("invalid email"),
    password: z.string().min(8),
});

export default userLoginSchema;
