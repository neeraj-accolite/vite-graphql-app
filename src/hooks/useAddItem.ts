import { useMutation } from "@apollo/client"
import { ADD_ITEM_TO_CART_MUTATION } from "../gql/addItemGql";

interface CartResult {
    addItemToCart: Function;
    data: any;
    loading: boolean;
    error: any;
}

export function useAddItem(): CartResult {

    const [addItemToCart, { data, loading, error },] = useMutation(ADD_ITEM_TO_CART_MUTATION);

    return {
        addItemToCart,
        data,
        loading,
        error,
    }
}