import { gql } from "@apollo/client";

export const CART_ITEM_ADDED_SUBSCRIPTION = gql`
   subscription OnCartUpdated($cartId: ID!) {
    onCartUpdated(cartId: $cartId) {
        cartId
        description
        grandTotal {
           ...CoreAmountFragment
        }
        id
        images
        lineTotal {
            ...CoreAmountFragment
        }
        name
        quantity
        unitTotal {
           ...CoreAmountFragment
        }
    }
  }
`