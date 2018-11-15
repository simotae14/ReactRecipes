import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const handleSignout = (client, history) => {
    // clear token
    localStorage.setItem('token', '');
    // client reset store
    client.resetStore();
    // redirect to home
    history.push("/");
}

const Signout = ({ history }) => (
    <ApolloConsumer>
        {
            client => {
                return (
                    <button
                        onClick={() => handleSignout(client, history)}
                    >
                        Signout
                    </button>
                );
            }
        }
    </ApolloConsumer>
);



export default withRouter(Signout);