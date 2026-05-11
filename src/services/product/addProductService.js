import { addItem } from "../../Repositories/databaseRepository.js";
import AppError from "../../utils/appError.js";
import productSchema from "../../schemas/productSchema.js";

export default async function addProductService(body) {
    let verify = productSchema.safeParse(body);
    if (!verify.success)
        throw new AppError("Invalid " + verify.error.issues[0].path[0], 400);
    let data = verify.data;
    let result = await addItem(data, "products");
    return {
        success: true,
        id: result.insertedId,
        message: "Product is added",
    };
}
