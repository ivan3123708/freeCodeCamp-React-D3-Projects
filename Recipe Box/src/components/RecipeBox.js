import React from 'react';

import Header from './Header';
import Recipes from './Recipes';
import AddRecipeModal from './AddRecipeModal';
import EditRecipeModal from './EditRecipeModal';

class RecipeBox extends React.Component {

    state = {
        recipes: [
            {
                title: 'Black Magic Cake',
                image: 'http://img.taste.com.au/9isesBer/taste/2016/11/caramello-cake-105070-1.jpeg',
                ingredients: '1 3/4 cups all-purpose flour, 2 cups white sugar, 3/4 cup unsweetened cocoa powder, 2 teaspoons baking soda, 1 teaspoon baking powder, 1 teaspoon salt, 2 eggs, 1 cup strong brewed coffee, 1 cup buttermilk, 1/2 cup vegetable oil, 1 teaspoon vanilla extract'
            }
        ],
        selected: undefined,
        addModal: false,
        editModal: false
    }

    add = (title, image, ingredients) => {

        const titles = this.state.recipes.map((obj) => obj.title);

        if(!title || !ingredients) {
            return 'Please enter values for recipe name and ingredients.';
        } else if(titles.indexOf(title) !== -1) {
            return 'Recipe with the same name already exists.';
        }

        this.setState((prevState) => ({
            recipes: prevState.recipes.concat({title: title, image: image, ingredients: ingredients})
            }));
    };

    select = (item) => {

      const recipe = this.state.recipes.filter((obj) => {
        return obj.title === item;
      });

      this.setState(() => ({ selected: recipe[0] }));
    };

    edit = (title, editedRecipe) => {
      if(!editedRecipe.title || !editedRecipe.ingredients) return 'Please enter title and ingredients.';

      const editedRecipes = this.state.recipes.map((recipe) => {
          if(recipe.title === title) return editedRecipe;
          else return recipe;
        });
      this.setState((prevState) => ({ recipes: editedRecipes}));
    }

    remove = (recipe) => {
        this.setState((prevState) => ({
            recipes: prevState.recipes.filter((item) => item.title !== recipe),
            selected: undefined
        }));
    };

    removeAll = () => {
        this.setState(() => ({
            recipes: [],
            selected: undefined
        }));
    };


    toggleAddModal = () => {
        this.setState((prevState) => (
            { addModal: !prevState.addModal }
        ));
    };

    toggleEditModal = () => {
        this.setState((prevState) => (
            { editModal: !prevState.editModal }
        ));
    };

    componentDidMount() {
        try {
            const recipes = JSON.parse(localStorage.getItem('recipes'));

            if(recipes) {
                this.setState(() => ({ recipes: recipes }));
            }
        } catch(e) {
            console.log('localStorage Error');
        }
    };

    componentDidUpdate(prevState) {
        const recipes = JSON.stringify(this.state.recipes);
        localStorage.setItem('recipes', recipes);
    };

    render() {
        return (
            <div>
                <Header/>
                <div className="wrapper">
                    <Recipes 
                        recipes={this.state.recipes}
                        selected={this.state.selected}
                        add={this.toggleAddModal}
                        edit={this.toggleEditModal}
                        select={this.select}
                        remove={this.remove}
                        removeAll={this.removeAll}
                    />
                    <AddRecipeModal 
                        open={this.state.addModal} 
                        close={this.toggleAddModal} 
                        add={this.add}
                    />
                    <EditRecipeModal
                        open={this.state.editModal}
                        close={this.toggleEditModal}
                        edit={this.edit}
                        selected={this.state.selected}
                        select={this.select}
                    />
                </div>
            </div>
        )
    }
}

export default RecipeBox;