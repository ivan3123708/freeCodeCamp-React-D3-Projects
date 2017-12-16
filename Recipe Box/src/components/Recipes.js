import React from 'react';

import Recipe from './Recipe';
import Ingredients from './Ingredients';

const Recipes = (props) => (
    <div className="recipes">
        <div className="recipe-list">
            <h3>List of recipes:</h3>
            {props.recipes.length === 0 && <p className="message">Your list is empty. Please, click the add recipe button to add a recipe.</p>}
            <div className="recipe-title">
                {props.recipes.map((item) => <Recipe key={item.title} recipe={item.title} select={props.select} remove={props.remove}/>)}
            </div>
            <div className="recipe-list-buttons">
            <button className="red-button" onClick={props.add}>Add Recipe</button>
            <button className="red-button" onClick={props.removeAll}>Remove All</button>
            </div>
        </div>
        <div className="recipe-content">
            {props.recipes.length === 0 && <p>Your list is empty. Please add a recipe.</p>}
            {!props.selected && props.recipes.length > 0 && <p>Click on a recipe on left to see the ingredients.</p>}
            {props.selected && <Ingredients recipe={props.selected} edit={props.edit} remove={props.remove}/>}
        </div>
    </div>
);

export default Recipes;
