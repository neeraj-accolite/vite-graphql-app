import { gql } from '@apollo/client';

export const CORE_AMOUNT_FIELDS = gql`
  fragment CoreAmountFragment on Money {
    amount
    formatted
  }
`;