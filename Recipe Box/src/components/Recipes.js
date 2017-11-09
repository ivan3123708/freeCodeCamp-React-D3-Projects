import React from 'react';

import Recipe from './Recipe';
import Ingredients from './Ingredients';

class Recipes extends React.Component {

    state = {
        recipe: undefined
    }

    select = (item) => {
        
        const recipe = this.props.recipes.filter((obj) => {
            return obj.title === item;
        });

        this.setState(() => ({recipe: recipe[0]}));
    }

    render() {
        return (
            <div className="recipes">
                <div className="recipe-list">
                    <h3>List of recipes:</h3>
                    {this.props.titles.length === 0 && <p className="message">Your list is empty. Please, click the add recipe button to add a recipe.</p>}
                    <div className="recipe-title">
                        {this.props.titles.map((item) => <Recipe key={item} recipe={item} select={this.select} remove={this.props.remove}/>)}
                    </div>
                    <div className="recipe-list-buttons">
                        <button onClick={this.props.add}>Add Recipe</button>
                        <button onClick={this.props.removeAll}>Remove All</button>
                    </div>
                </div>
                <div className="recipe-content">
                    {this.props.titles.length === 0 && <p>Your list is empty. Please add a recipe.</p>}
                    {!this.state.recipe && <p>Click on a recipe on left to see the ingredients.</p>}
                    {this.state.recipe && <Ingredients recipe={this.state.recipe}/>}
                </div>
            </div>
        );
    }
}

export default Recipes;
