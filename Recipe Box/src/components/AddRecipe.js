import React from 'react';

class AddRecipe extends React.Component {

    add = (e) => {
        e.preventDefault();
        const title = e.target.elements.title.value.trim();
        const ingredients = e.target.elements.ingredients.value.trim();
        this.props.add(title, ingredients);
        e.target.elements.title.value = '';
        e.target.elements.ingredients.value = '';
    }

    render() {
        return (
            <div>
                <form onSubmit={this.add}>
                    <h3>Recipe</h3>
                    <input type="text" name="title" placeholder="Recipe name"/>
                    <h3>Ingredients</h3>
                    <input type="text" name="ingredients" placeholder="Enter ingredients (separated by comas)"/>
                    <br/>
                    <button>Add Recipe</button>
                </form>
            </div>
        )
    }
}

export default AddRecipe;