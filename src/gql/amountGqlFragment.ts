import { gql } from '@apollo/client';

export const CORE_AMOUNT_FIELDS = gql`
  fragment CoreAmountFragment on Money {
    amount
    currency {
      code
      symbol
      thousandsSeparator
      decimalSeparator
    }
    formatted
  }
`;