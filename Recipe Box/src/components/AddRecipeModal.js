import React from 'react';
import Modal from 'react-modal';

class AddRecipeModal extends React.Component {

    state = {
        error: undefined
    }

    add = (e) => {
        e.preventDefault();

        const title = e.target.elements.title.value.trim();
        const ingredients = e.target.elements.ingredients.value.trim();

        const error = this.props.add(title, ingredients);
        
        this.setState({error: error});
        
        if(!error) {
            e.target.elements.title.value = '';
            e.target.elements.ingredients.value = '';
            this.props.close();
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.open}
                onRequestClose={this.props.close}
                className="modal"
            >
                <button className="modalClose" onClick={this.props.close}>X</button>
                <div>
                    <form onSubmit={this.add}>
                        <h3>Recipe</h3>
                        <input type="text" name="title" placeholder="Recipe name" />
                        <span>{this.state.error}</span>
                        <h3>Ingredients</h3>
                        <textarea type="text" name="ingredients" placeholder="Enter ingredients (separated by comas)" rows="10"/>
                        <br />
                        <button className="modalSave">Save</button>
                    </form>
                </div>
            </Modal>
        )
    }
}

export default AddRecipeModal;