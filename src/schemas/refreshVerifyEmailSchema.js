import { z } from "zod";
let refreshVerifyEmailSchema = z.object({
    id: z.string().min(1),
});

export default refreshVerifyEmailSchema;
