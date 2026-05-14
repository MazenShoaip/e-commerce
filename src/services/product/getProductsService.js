import { findItem } from "#repositories/databaseRepository.js";

export default async function getProductsService() {
    let result = await findItem({}, "products");
    return {
        items: result,
    };
}
