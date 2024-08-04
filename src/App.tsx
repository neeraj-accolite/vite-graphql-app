import { createApolloClient } from './libs/apolloClient';
import {  ProfilePage } from './pages';
import { ApolloProvider} from '@apollo/client';

export default function Root() {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <ProfilePage />
    </ApolloProvider>
  );
}
