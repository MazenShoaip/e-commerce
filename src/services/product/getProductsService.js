import { findItems } from "#repositories/databaseRepository.js";

export default async function getProductsService() {
    let result = await findItems({}, "products");
    return {
        items: result,
    };
}
