import { QueryResult, useQuery } from "@apollo/client"
import { GET_CART_DATA } from "../gql/cartGql";
import { CartItemData } from "@types";

interface CartResult extends Pick<QueryResult, "loading" | "error" | "refetch"> {
    cart: {
        id: string;
        grandTotal: {
            amount: number;
            formatted: string;
        };
        items: CartItemData[];
    };
}

export function useCart(cartId?: string): CartResult {

    const { data, loading, error, refetch } = useQuery(GET_CART_DATA, {
        variables: {
            id: cartId
        },
        nextFetchPolicy: 'network-only'
    });

    return {
        cart: data?.cart,
        loading,
        error,
        refetch
    }
}