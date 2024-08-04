// import React from 'react'
import { ApolloClient, QueryResult, useQuery } from "@apollo/client"
import { GET_PROFILE_DATA } from '@acc/api';

export function useProfiles(): QueryResult {
    return useQuery(GET_PROFILE_DATA)
}