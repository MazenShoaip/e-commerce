import { z } from "zod";
let cartSchema = z.object({
    cart: z.array(z.string().min(1)).min(1),
});
export default cartSchema;
