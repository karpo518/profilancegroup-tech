import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import { store } from './state/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  uri: process.env.API_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);
