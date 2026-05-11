import { z } from "zod";
let productUpdateSchema = z.object({
    id: z.string().min(1),
    product: z.string().min(3).optional(),
    stock: z.int().min(0).optional(),
    price: z.number().min(0).optional()

});

export default productUpdateSchema;
