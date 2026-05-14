import { z } from "zod";
let cartElement = z.object({
    product_id: z.number().int().min(0),
    quantity: z.number().int().min(0),
});
let cartSchema = z.object({
    cart: z.array(cartElement).min(1),
});
export default cartSchema;
