import React from 'react';
import Modal from 'react-modal';

class EditRecipeModal extends React.Component {
  state = {
    title: '',
    image: '',
    ingredients: '',
    error: undefined
  }
  
  changeTitle = (e) => {
    const title = e.target.value;
    this.setState((prevState) => ({ title: title }));
  }

  changeImage = (e) => {
    const image = e.target.value;
    this.setState((prevState) => ({ image: image }));
  }

  changeIngredients = (e) => {
    const ingredients = e.target.value;
    this.setState((prevState) => ({ ingredients: ingredients }));
  }

  edit = (e) => {
    e.preventDefault();

    const title = this.props.selected.title;
    
    const error = this.props.edit(title, {
      title: this.state.title,
      image: this.state.image,
      ingredients: this.state.ingredients
    });

    this.setState({ error: error });

    if(!error) {
      e.target.elements.title.value = '';
      e.target.elements.image.value = '';
      e.target.elements.ingredients.value = '';
      this.props.select(undefined);
      this.props.close();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected && prevProps.selected && this.props.selected.title !== prevProps.selected.title) {
      this.setState({
        title: this.props.selected.title,
        image: this.props.selected.image,
        ingredients: this.props.selected.ingredients,
        error: undefined
      });
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
          <form onSubmit={this.edit}>
            <h3>Recipe</h3>
            <input 
              type="text" 
              name="title" 
              placeholder="Enter name"
              value={this.state.title}
              onChange={this.changeTitle}
            />
            <h3>Image</h3>
            <input 
              type="text" 
              name="image" 
              placeholder="Enter image url (optional)" 
              value={this.state.image}
              onChange={this.changeImage}
            />
            <h3>Ingredients</h3>
            <textarea 
              type="text" 
              name="ingredients" 
              placeholder="Enter list of ingredients (separated by comas)"
              rows="10" 
              value={this.state.ingredients}
              onChange={this.changeIngredients}
            />
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

export default EditRecipeModal;