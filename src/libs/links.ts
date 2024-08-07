import { HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from "@apollo/client/utilities";
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

    return split(({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
        wsLink,
        httpLink
    )
}