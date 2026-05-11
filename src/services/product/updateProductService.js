import { updateItem } from "../../Repositories/databaseRepository.js";
import AppError from "../../utils/appError.js";
import productUpdateSchema from "../../schemas/productUpdateSchema.js";

export default async function updateProductService(body) {
    let verify = productUpdateSchema.safeParse(body);
    if (!verify.success)
        throw new AppError("Invalid " + verify.error.issues[0].path[0], 400);
    let data = verify.data;
    data._id = data.id;
    delete data.id;
    let result = await updateItem(data, "products");
    return {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
    };
}
