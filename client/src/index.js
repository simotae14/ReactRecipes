import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// creo il client che punta a BE
const client =  new ApolloClient({
    uri: 'http://localhost:4444/graphql'
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
document.getElementById('root'));
