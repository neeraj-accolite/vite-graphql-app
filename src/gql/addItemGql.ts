import { gql } from "@apollo/client";

export const ADD_ITEM_TO_CART_MUTATION = gql`
  mutation AddItem($input:AddToCartInput!) {
    addItem(input: $input) {
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