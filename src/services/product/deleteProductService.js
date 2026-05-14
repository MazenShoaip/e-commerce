import { deleteItem } from "#repositories/databaseRepository.js";
import AppError from "#utils/appError.js";
import idSchema from "#schemas/idSchema.js";

export default async function removeProductService(body) {
    let verify = idSchema.safeParse(body);
    if (!verify.success)
        throw new AppError("Invalid " + verify.error.issues[0].path[0], 400);
    let data = { id: verify.data.id };
    let result = await deleteItem(data, "products");
    return {
        deletedCount: result.rowCount,
    };
}
