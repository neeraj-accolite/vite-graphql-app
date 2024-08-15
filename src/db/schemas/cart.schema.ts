import { RxDocument, RxJsonSchema } from "rxdb";
import { CartCollection, CartCollectionMethod, CartDataTypes } from "../db";

export const cartSchema: RxJsonSchema<CartDataTypes> = {
    title: 'Cart Schema',
    version: 0,
    description: 'Cart Table',
    primaryKey: 'id',
    type: "object",
    properties: {
        id: {
            type: "string",
            "maxLength": 20
        },
        grandTotal: {
            type: "object",
            properties: {
                "amount": {
                    type: "number"
                },
                "formatted": {
                    type: "string"
                }
            }
        },
        items: {
            type: "array",
            properties: {
                id: {
                    type: "string"
                },
                name: {
                    type: "string"
                },
                description: {
                    type: "string"
                },
                images: {
                    type: "string"
                },
                quantity: {
                    type: "number"
                },
                unitTotal: {
                    type: "object",
                    properties: {
                        "amount": {
                            type: "number"
                        },
                        "formatted": {
                            type: "string"
                        }
                    }
                },
                lineTotal: {
                    type: "object",
                    properties: {
                        "amount": {
                            type: "number"
                        },
                        "formatted": {
                            type: "string"
                        }
                    }
                },
            }
        }
    },
    required: [
        "id"
    ]
};

export const cartCollectionMethod: CartCollectionMethod = {
    getCart: async function (this: CartCollection, id: string): Promise<RxDocument<CartDataTypes>> {
        const cart: RxDocument<CartDataTypes> = await this.findOne({ selector: { id } }).exec();
        return cart;
    }
}