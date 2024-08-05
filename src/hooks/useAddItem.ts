import { useMutation } from "@apollo/client"
import { ADD_ITEM_TO_CART_MUTATION } from "../gql/addItemGql";
import { Order } from "@acc/api";
import { useCallback, useEffect } from "react";

interface CartResult {
    addItemToCart: (product: Order, cartId?: string) => void;
    data: any;
    loading: boolean;
    error: any;
}

export function useAddItem(onItemAddedToCart: Function): CartResult {

    const [mutationFn, { data, loading, error },] = useMutation(ADD_ITEM_TO_CART_MUTATION);

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
            onItemAddedToCart();
        }
    }, [data, loading]);

    return {
        addItemToCart,
        data,
        loading,
        error,
    }
}