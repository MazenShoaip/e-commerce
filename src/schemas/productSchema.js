import { z } from "zod";
let productSchema = z.object({
    product: z.string().min(3),
    stock: z.int().min(0),
    price: z.number().min(0)

});

export default productSchema;
