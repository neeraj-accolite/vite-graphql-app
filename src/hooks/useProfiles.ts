import { QueryResult, useQuery } from "@apollo/client"
import { GET_PROFILE_LIST_DATA } from "../gql/profileListGql";

export async function useProfiles(): Promise<QueryResult> {
    return useQuery(GET_PROFILE_LIST_DATA)
}