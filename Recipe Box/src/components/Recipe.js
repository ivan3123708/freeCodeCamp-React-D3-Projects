import React from 'react';

class Recipe extends React.Component {

    select = (e) => {
        e.preventDefault();
        const item = e.target.innerHTML;
        this.props.select(item);
    }

    render() {
        return (
            <div>
                <p onClick={this.select}>{this.props.recipe}</p>
                <button onClick={() => this.props.remove(this.props.recipe)} title="Remove this recipe" >X</button>
            </div>
        );
    }
} 

export default Recipe;