import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import { SIGNIN_USER } from '../../queries';

const initialState = {
    username: "",
    password: ""
};

class Signin extends React.Component {
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
    handleSubmit = (event, signinUser) => {
        event.preventDefault();
        signinUser().then(async ({ data }) => {
            console.log(data);
            // set token inside the localStorage
            localStorage.setItem('token', data.signinUser.token);
            // refetch the current user
            await this.props.refetch();
            // reset the input in the form
            this.clearState();
            // redirect to the home
            this.props.history.push('/');
        });
    }

    // validation function
    validateForm = () => {
        const { username, password } = this.state;

        const isInvalid = !username || !password;

        return isInvalid;
    }
    render() {
        const { username, password } = this.state;
        return (
            <div
                className="App"
            >
                <h2
                    className="App"
                >
                    Signin
                </h2>
                <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
                    {(signinUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
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

export default withRouter(Signin);