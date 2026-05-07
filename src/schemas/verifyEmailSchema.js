import { z } from "zod";
let verifyEmailSchema = z.object({
    id: z.string().min(1),
    otp: z.string().length(7),
});

export default verifyEmailSchema;
