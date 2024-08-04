import { QueryResult, useQuery } from "@apollo/client"
import { GET_PROFILE_LIST_DATA } from "../gql/profileListGql";
import { useEffect } from "react";

interface CartResult extends Pick<QueryResult, "loading" | "error" | "refetch"> {
    cart: any;
}

export function useProfiles(cartId?: string): CartResult {

    const { data, loading, error, refetch } = useQuery(GET_PROFILE_LIST_DATA, {
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