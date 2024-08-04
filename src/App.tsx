import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createApolloClient } from './libs/apolloClient';
import {  CartPage } from './pages';
import { ApolloProvider} from '@apollo/client';

export default function Root() {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Routes>
        <Route path="/cart/:cartId"  Component={CartPage} />
      </Routes>
    </BrowserRouter>
    </ApolloProvider>
  );
}
