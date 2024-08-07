import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import { CORE_AMOUNT_FIELDS } from '../gql/amountGqlFragment';
import { getLinks } from './links';

export const createApolloClient = () => {
    const client = new ApolloClient({
        link: getLinks(),
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