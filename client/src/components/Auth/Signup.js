import React from 'react';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import Error from '../Error';
import { SIGNUP_USER } from '../../queries';

const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
};

class Signup extends React.Component {
    state = { ...initialState };

    clearState = () => {
        this.setState({ ...initialState });
    }
    // handler for the change of the input fields
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    // handler for the submit
    handleSubmit = (event, signupUser) => {
        event.preventDefault();
        signupUser().then(async ({ data }) => {
            console.log(data);
            // set token inside the localStorage
            localStorage.setItem('token', data.signupUser.token);
            // refetch query getCurrentUser
            await this.props.refetch();
            // reset the input in the form
            this.clearState();
            // redirect to the home
            this.props.history.push('/');
        });
    }

    // validation function
    validateForm = () => {
        const { username, email, password, passwordConfirmation } = this.state;

        const isInvalid = !username || !email || !password || password !== passwordConfirmation;

        return isInvalid;
    }
    render() {
        const { username, email, password, passwordConfirmation } = this.state;
        return (
            <div
                className="App"
            >
                <h2
                    className="App"
                >
                    Signup
                </h2>
                <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
                    {(signupUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="password"
                                    name="passwordConfirmation"
                                    placeholder="Confirm Password"
                                    value={passwordConfirmation}
                                    onChange={this.handleChange}
                                />
                                <button
                                    type="submit"
                                    className="button-primary"
                                    disabled={loading || this.validateForm() }
                                >
                                    Submit
                                </button>
                                { error && <Error error={error} /> }
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        );
    }
}

export default withRouter(Signup);