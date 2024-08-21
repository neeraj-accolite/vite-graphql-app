import { createRxDatabase } from "rxdb"
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie"
import { cartCollectionMethod, cartSchema } from "./schemas/cart.schema"
import { ShoppingAppDbCollections } from "./db";
import { indexedDB, IDBKeyRange } from "fake-indexeddb";

export const createDatabaseClient = async () => {

    const db = await createRxDatabase<ShoppingAppDbCollections>({
        name: 'nutrien-shopping-cart',
        storage: process.env.NODE_ENV == 'test'
            ? getRxStorageDexie({
                indexedDB,
                IDBKeyRange
            })
            :
            getRxStorageDexie(),
        password: "StrongPassword@98",
        ignoreDuplicate: process.env.NODE_ENV == 'test'
    });

    await db.addCollections({
        carts: {
            schema: cartSchema,
            statics: cartCollectionMethod
        }
    });
    return db;
}