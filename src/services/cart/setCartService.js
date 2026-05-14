import { updateItem, findItem } from "#repositories/databaseRepository.js";
import AppError from "#utils/appError.js";
import cartSchema from "#schemas/cartSchema.js";

export default async function setCartService(items, user) {
    // let verify = cartSchema.safeParse(items);
    // if (!verify.success)
    //     throw new AppError("Invalid " + verify.error.issues[0].path[0], 400);
    // let data = verify.data.cart;
    // let badCart = [];
    // for (let i = 0; i < data.length; i++) {
    //     let item = await findItem({ _id: data[i] }, "products");
    //     if (!item) badCart.push(item);
    // }
    // if (badCart.length > 0)
    //     throw new AppError(`${badCart} Does not Exist`, 400);
    
    // let result = await updateItem({ _id: user.sub, cart: data }, "users");
    // return {
    //     id: result.insertedId,
    //     message: "Product is added",
    // };
}
