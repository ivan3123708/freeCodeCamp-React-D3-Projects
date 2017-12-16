import React from 'react';

const Ingredients = (props) => (
    <div className="ingredients">
        <h2>{props.recipe.title}</h2>
        <img src={`${props.recipe.image}` || require('../styles/img/default.png')} alt={props.recipe.title}/>
        <ul>
            {props.recipe.ingredients.split(', ').map((item) => <li key={item}>{item}</li>)}
        </ul>
        <button className="red-button" onClick={() => props.edit()}>Edit</button>
        <button className="red-button" onClick={() => props.remove(props.recipe.title)}>Remove</button>
    </div>
);

export default Ingredients;