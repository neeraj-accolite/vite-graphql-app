import { QueryResult, useLazyQuery } from "@apollo/client"
import { GET_CART_DATA } from "../gql/cartGql";
import { useEffect, useState } from "react";
import { useDatabase } from "../db/useDatabase";
import { CartDataTypes } from "../db/db";
import { RxDocument } from "rxdb";

interface CartResult extends Pick<QueryResult, "loading" | "error"> {
    cart?: CartDataTypes;
    refetch: () => void;
}

export function useCart(cartId?: string): CartResult {

    const [cartData, setCartData] = useState<RxDocument<CartDataTypes>>();
    const database = useDatabase();

    const [fetchCartDetailsFromServer, { data, loading, error }] = useLazyQuery<{ cart: CartDataTypes }>(GET_CART_DATA);

    const loadData = () => {
        fetchCartDetailsFromServer({
            variables: {
                id: cartId
            },
            fetchPolicy: 'no-cache'
        });
    }

    useEffect(() => {
        async function fetchCartDetails() {
            if (cartId != null) {
                const cartDetails = await database.carts.getCart(cartId);
                cartDetails?.$.subscribe(cart => {
                    if (!cart) {
                        return;
                    }
                    setCartData(cart);
                })
                setCartData(cartDetails);
                if (!cartDetails?.items) {
                    //Refetch the cart details if there are no items saved.
                    loadData();
                }
            }
        }
        fetchCartDetails();
    }, []);

    useEffect(() => {
        if (data) {
            async function updateData() {
                if (cartData?.id) {
                    //update cart data
                    const updatedCart = await cartData.patch({
                        items: data?.cart?.items,
                        grandTotal: data?.cart?.grandTotal
                    })
                    setCartData(updatedCart);
                }
                else if (data?.cart) {
                    //insert cart data
                    const cartDocument = await database.carts.insert(data?.cart);
                    setCartData(cartDocument);
                }
            }
            updateData();
        }
    }, [data]);

    return {
        cart: cartData,
        loading,
        error,
        refetch: loadData
    }
}