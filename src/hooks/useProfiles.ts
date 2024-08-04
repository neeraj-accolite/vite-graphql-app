import { QueryResult, useQuery } from "@apollo/client"
import { GET_CART_DATA } from "../gql/cartGql";

interface CartResult extends Pick<QueryResult, "loading" | "error" | "refetch"> {
    cart: any;
}

export function useProfiles(cartId?: string): CartResult {

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