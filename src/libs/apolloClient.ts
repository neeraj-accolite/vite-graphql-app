import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import { CORE_AMOUNT_FIELDS } from '../gql/amountGqlFragment';

export const createApolloClient = () => {
    const client = new ApolloClient({
        link: new HttpLink({
            uri: 'https://rcbeu6lau5ddbndzu4g7nefngi.appsync-api.us-east-1.amazonaws.com/graphql', // Replace with your GraphQL endpoint
            headers: {
                "x-api-key": "da2-p54z72v7tzfkbkwuowrwdgzxpe"
            }
        }),
        cache: new InMemoryCache({
            fragments: createFragmentRegistry(CORE_AMOUNT_FIELDS)
        }),
        defaultOptions: {
            watchQuery: {
                nextFetchPolicy(currentFetchPolicy) {
                    if (currentFetchPolicy == 'network-only' ||
                        currentFetchPolicy == 'cache-and-network'
                    ) {
                        // Demote the network policies (except "no-cache") to "cache-first"
                        // after the first request.
                        return 'cache-first';
                    }
                    return currentFetchPolicy;
                }
            }
        }
    });
    return client;
}