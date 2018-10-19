import React from 'react';

class Signup extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    }
    // handler for the change of the input fields
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
                <form className="form">
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
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default Signup;