import { RxCollection, RxJsonSchema, RxDocument } from "rxdb"

export interface CartDataTypes {
    id: string;
    grandTotal: Money;
    items: Array<CartItem>;
}

interface Money {
    amount: number;
    formatted: string;
}

export interface CartItem {
    id: string;
    name: string;
    description: string;
    images: string;
    quantity: number;
    lineTotal: Money;
    unitTotal: Money;
}

export type CartCollectionMethod = {
    getCart: (id: string) => Promise<RxDocument<CartDataTypes>>;
}

export type CartCollection = RxCollection<CartDataTypes, T, CartCollectionMethod>;

export interface ShoppingAppDbCollections {
    carts: CartCollection
}