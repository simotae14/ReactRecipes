import React from 'react';

class AddRecipe extends React.Component {
    state = {
        name: '',
        instructions: '',
        category: 'Breakfast',
        description: '',
        username: ''
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { category, description, instructions, name, username } = this.state;
        return (
            <div className="App">
                <h2 className="App">
                    Add Recipe
                </h2>
                <form className="form">
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
                    <button type="submit" className="button-primary">Submit</button>
                </form>
            </div>
        )
    };
};

export default AddRecipe;