import React from 'react';

import { Mutation } from 'react-apollo';

import { ADD_RECIPE } from '../../queries';

import Error from '../Error';

class AddRecipe extends React.Component {
    state = {
        name: '',
        instructions: '',
        category: 'Breakfast',
        description: '',
        username: ''
    };

    componentDidMount() {
        this.setState({
            username: this.props.session.getCurrentUser.username
        });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(({ data }) => {
            console.log(data);
        })
    }

    validateForm = () => {
        const { category, description, instructions, name, username } = this.state;
        const isInvalid = !name || !category || !description || !instructions || !username;
        return isInvalid;
    }

    render() {
        const { category, description, instructions, name, username } = this.state;
        return (
        <Mutation mutation={ADD_RECIPE} variables={{category, description, instructions, name, username}}>
            {(addRecipe, { data, loading, error }) => {
                return (
                    <div className="App">
                        <h2 className="App">
                            Add Recipe
                        </h2>
                        <form className="form" onSubmit={(event) => this.handleSubmit(event, addRecipe)}>
                            <input
                                value={name}
                                type="text"
                                name="name"
                                placeholder="Recipe Name"
                                onChange={this.handleChange}
                            />
                            <select
                                value={category}
                                name="category"
                                onChange={this.handleChange}
                            >
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
                            <input
                                value={description}
                                type="text"
                                name="description"
                                placeholder="Add description"
                                onChange={this.handleChange}
                            />
                            <textarea
                                value={instructions}
                                name="instructions"
                                placeholder="Add instructions"
                                cols="30"
                                rows="10"
                                onChange={this.handleChange}
                            ></textarea>
                            <button
                                disabled={loading || this.validateForm()}
                                type="submit"
                                className="button-primary"
                            >
                                Submit
                            </button>
                            { error && <Error error={error} /> }
                        </form>
                    </div>
                );
            }}
        </Mutation>);
    };
};

export default AddRecipe;