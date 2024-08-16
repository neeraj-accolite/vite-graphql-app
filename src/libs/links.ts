import { ApolloLink, from, HttpLink, NextLink, Operation, split } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition, omitDeep } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import awsconfig from './aws-exports';

/**
 * This will generate the links for HTTP and Websockets
 * @returns 
 */
export function getLinks() {

    const httpLink = new HttpLink({
        uri: awsconfig.aws_appsync_graphqlEndpoint,
        headers: {
            "x-api-key": awsconfig.aws_appsync_apiKey
        }
    });

    const wsLink = new GraphQLWsLink(
        createClient({
            url: awsconfig.aws_appsync_realtime_graphqlEndpoint,
            connectionParams: {
                headers: {
                    "x-api-key": awsconfig.aws_appsync_apiKey,
                }
            }
        }),
    );

    const networkLinks = split(({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
        wsLink,
        httpLink,
    );


    const cleanTypeName = new ApolloLink((operation: Operation, forward: NextLink) => {
        if (operation.variables) {
            operation.variables = omitDeep(operation.variables, '__typename');
        }
        return forward(operation).map((data) => {
            return data;
        });
    });

    return from([cleanTypeName, networkLinks]);
}