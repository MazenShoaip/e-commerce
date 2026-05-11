import { z } from "zod";
let idSchema = z.object({
    id: z.string().min(1),
});

export default idSchema;
