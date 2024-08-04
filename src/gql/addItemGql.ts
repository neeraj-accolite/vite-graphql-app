import { gql } from "@apollo/client";

export const ADD_ITEM_TO_CART_MUTATION = gql`
  mutation AddItem($input:AddToCartInput!) {
    addItem(input: $input) {
      id
    }
  }
`