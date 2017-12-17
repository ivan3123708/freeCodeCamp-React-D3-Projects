import React from 'react';
import Modal from 'react-modal';

class AddRecipeModal extends React.Component {

    state = {
        error: undefined
    }

    add = (e) => {
        e.preventDefault();

        const title = e.target.elements.title.value.trim();
        const image = e.target.elements.image.value.trim();
        const ingredients = e.target.elements.ingredients.value.trim();

        const error = this.props.add(title, image, ingredients);
        
        this.setState({error: error});
        
        if(!error) {
            e.target.elements.title.value = '';
            e.target.elements.image.value = '';
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
                <div className="modal-form">
                    <form onSubmit={this.add}>
                        <h3>Recipe</h3>
                        <input type="text" name="title" placeholder="Enter recipe name" />
                        <h3>Image</h3>
                        <input type="text" name="image" placeholder="Enter image url (optional)" />
                        <h3>Ingredients</h3>
                        <textarea type="text" name="ingredients" placeholder="Enter list of ingredients (separated by comas)" rows="10"/>
                        {this.state.error}
                        <br />
                        <button className="red-button">Save</button>
                        <button className="red-button" onClick={this.props.close}>Cancel</button>
                    </form>
                </div>
            </Modal>
        )
    }
}

export default AddRecipeModal;