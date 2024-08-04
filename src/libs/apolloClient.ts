import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const createApolloClient = () => {
    const client = new ApolloClient({
        link: new HttpLink({
            uri: 'https://flyby-locations-sub.herokuapp.com/', // Replace with your GraphQL endpoint
        }),
        cache: new InMemoryCache(),
    });
    return client;
}