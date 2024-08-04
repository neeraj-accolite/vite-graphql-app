import { gql } from "@apollo/client";

export const GET_PROFILE_LIST_DATA = gql`
query ExampleQuery {
  _service {
    sdl
  }
}
`