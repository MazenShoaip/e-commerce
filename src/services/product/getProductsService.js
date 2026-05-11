import { findItems } from "../../Repositories/databaseRepository.js";

export default async function getProductsService(body) {
    let result = await findItems({}, "products");
    return {
        success: true,
        items: result,
    };
}
