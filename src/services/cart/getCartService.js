import { findItem } from "#repositories/databaseRepository.js";

export default async function getCartService(user) {
    let result = await findItem({ _id: user.sub }, "users");
    return {
        cart: result.cart,
    };
}
