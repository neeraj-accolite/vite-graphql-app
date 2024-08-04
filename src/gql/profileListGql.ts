import { gql } from "@apollo/client";

export const GET_PROFILE_LIST_DATA = gql`
query Cart($id: ID!) {
  cart(id: $id){
    id
    grandTotal {
      amount
      currency {
        decimalDigits
      }
      formatted
    }
    items {
      id
      name
      images
      description
      quantity
      lineTotal {
        amount
      }
      unitTotal {
        amount
      }
    }
  }
}
`