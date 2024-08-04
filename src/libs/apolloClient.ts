import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const createApolloClient = () => {
    const client = new ApolloClient({
        link: new HttpLink({
            uri: 'https://api.cartql.com/', // Replace with your GraphQL endpoint
        }),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                nextFetchPolicy(currentFetchPolicy) {
                    // if (currentFetchPolicy == 'network-only' ||
                    //     currentFetchPolicy == 'cache-and-network'
                    // ) {
                    //     // Demote the network policies (except "no-cache") to "cache-first"
                    //     // after the first request.
                    //     return 'cache-first';
                    // }
                    return currentFetchPolicy;
                }
            }
        }
    });
    return client;
}