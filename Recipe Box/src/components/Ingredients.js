import React from 'react';

const Ingredients = (props) => (
    <div className="ingredients">
        <h3>{props.recipe.title}</h3>
        <p>{props.recipe.ingredients}</p>
    </div>
);

export default Ingredients;