import { findItem } from "#repositories/databaseRepository.js";

export default async function getCartService(user) {
    console.log(user)
    let result = await findItem({ user_id: user.sub }, "carts");
    return {
        cart: result.cart,
    };
}
