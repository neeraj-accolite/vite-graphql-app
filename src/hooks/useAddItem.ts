import { useMutation } from "@apollo/client"
import { ADD_ITEM_TO_CART_MUTATION } from "../gql/addItemGql";
import { Order } from "@acc/api";
import { useCallback, useEffect } from "react";
import { ItemAddedToCartResponse } from "@types";
import { useDatabase } from "../db/useDatabase";

interface CartResult {
    addItemToCart: (product: Order, cartId?: string) => void;
    data: any;
    loading: boolean;
    error: any;
}

export function useAddItem(onItemAddedToCart: () => void): CartResult {

    const [mutationFn, { data, loading, error },] = useMutation<{ addItem: ItemAddedToCartResponse }>(ADD_ITEM_TO_CART_MUTATION);

    const database = useDatabase();

    const addItemToCart = useCallback((product: Order, cartId?: string) => {
        mutationFn({
            variables: {
                input: {
                    cartId,
                    id: product.id,
                    name: `${product.title} - Cart Item`,
                    description: `This is the description for ${product.title} | Full BlackGreen Soul® Jupiter Pro | Office Chair | High Back Mesh Ergonomic Home Office Desk Chair  `,
                    price: parseInt(`` + product.price),
                    images: product.thumbnail,
                    quantity: product.quantity
                }
            }
        })
    }, []);

    useEffect(() => {
        if (!loading && data) {
            //item added to the cart. Update the local database.
            async function updateData() {
                if (data?.addItem) {
                    const addedItem = data.addItem;
                    const cartDocument = await database.carts.getCart(data?.addItem.cartId);
                    const cartItems = cartDocument.items;
                    cartItems.push({
                        id: addedItem.id,
                        name: addedItem.name,
                        description: addedItem.description,
                        images: addedItem.images,
                        lineTotal: addedItem.lineTotal,
                        unitTotal: addedItem.unitTotal,
                        quantity: addedItem.quantity
                    })
                    cartDocument.patch({
                        grandTotal: data?.addItem.grandTotal,
                        items: cartItems
                    })
                }
                onItemAddedToCart();
            }
            updateData();
        }
    }, [data, loading]);

    return {
        addItemToCart,
        data,
        loading,
        error,
    }
}