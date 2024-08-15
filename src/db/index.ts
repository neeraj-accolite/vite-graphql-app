import { createRxDatabase } from "rxdb"
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie"
import { cartCollectionMethod, cartSchema } from "./schemas/cart.schema"
import { ShoppingAppDbCollections } from "./db";

export const createDatabaseClient = async () => {

    const db = await createRxDatabase<ShoppingAppDbCollections>({
        name: 'NutrienShoppingAppDatabase',
        storage: getRxStorageDexie(),
        password: "StrongPassword@98"
    });

    await db.addCollections({
        carts: {
            schema: cartSchema,
            statics: cartCollectionMethod
        }
    });
    return db;
}