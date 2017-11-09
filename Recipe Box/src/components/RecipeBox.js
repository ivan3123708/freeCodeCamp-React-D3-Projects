import React from 'react';

import Header from './Header';
import Recipes from './Recipes';
import AddRecipeModal from './AddRecipeModal';

class RecipeBox extends React.Component {

    state = {
        titles: [
            'Black Magic Cake', 
            'Lasagna', 
            'Baked French Fries', 
            'Roasted Vegetables', 
            'Strawberry Smoothie'
        ],
        recipes: [
            {
                title: 'Black Magic Cake',
                ingredients: '1 3/4 cups all-purpose flour, 2 cups white sugar, 3/4 cup unsweetened cocoa powder, 2 teaspoons baking soda, 1 teaspoon baking powder, 1 teaspoon salt, 2 eggs, 1 cup strong brewed coffee, 1 cup buttermilk, 1/2 cup vegetable oil, 1 teaspoon vanilla extract'
            },
            {
                title: 'Lasagna',
                ingredients: '1 pound sweet Italian sausage, 3/4 pound lean ground beef, 1/2 cup minced onion, 2 cloves garlic, crushed 1 (28 ounce) can crushed tomatoes 2 (6 ounce) cans tomato paste, 2 (6.5 ounce) cans canned tomato sauce, 1/2 cup water, 2 tablespoons white sugar, 1 1/2 teaspoons dried basil leaves, 1/2 teaspoon fennel seeds, 1 teaspoon Italian seasoning, 1 tablespoon salt, 1/4 teaspoon ground black pepper, 4 tablespoons chopped fresh parsley, 12 lasagna noodles, 16 ounces ricotta cheese, 1 egg, 1/2 teaspoon salt, 3/4 pound mozzarella cheese, sliced, 3/4 cup grated Parmesan cheese'
            },
            {
                title: 'Baked French Fries',
                ingredients: '1 large baking potato, 1 tablespoon olive oil, 1/2 teaspoon paprika, 1/2 teaspoon garlic powder, 1/2 teaspoon chili powder, 1/2 teaspoon onion powder'
            },
            {
                title: 'Roasted Vegetables',
                ingredients: '1 small butternut squash, cubed, 2 red bell peppers, seeded and diced, 1 sweet potato, peeled and cubed, 3 Yukon Gold potatoes, cubed, 1 red onion, quartered, 1 tablespoon chopped fresh thyme, 2 tablespoons chopped fresh rosemary, 1/4 cup olive oil, 2 tablespoons balsamic vinegar salt and freshly ground black pepper'
            },
            {
                title: 'Strawberry Smoothie',
                ingredients: '1 cup soy milk, 1/2 cup rolled oats, 1 banana, broken into chunks, 14 frozen strawberries, 1/2 teaspoon vanilla extract, 1 1/2 teaspoons white sugar'
            }
        ],
        modal: false
    }

    toggleModal = () => {
        this.setState((prevState) => (
            {modal: !prevState.modal}
        ));
    }

    add = (title, ingredients) => {
        if(!title || !ingredients) {
            return 'Please enter values for recipe name and ingredients.';
        } else if(this.state.titles.indexOf(title) !== -1) {
            return 'Recipe with the same name already exists.';
        }

        this.setState((prevState) => (
            {
            titles: prevState.titles.concat(title),
            recipes: prevState.recipes.concat({title: title, ingredients: ingredients})
            }
        ));
    }

    remove = (recipe) => {
        this.setState((prevState) => (
            {
                titles: prevState.titles.filter((item) => item !== recipe),
                recipes: prevState.recipes.filter((item) => item.title !== recipe)
            }
        ));
    }

    removeAll = () => {
        this.setState(() => (
            {titles: [], recipes: []}
        ));
    }

    componentDidMount() {
        try {
            const titles = JSON.parse(localStorage.getItem('titles'));
            const recipes = JSON.parse(localStorage.getItem('recipes'));

            if(titles && recipes) {
                this.setState(() => (
                    {
                        titles: titles,
                        recipes: recipes
                    }
                ));
            }
        } catch(e) {
            console.log('localStorage Error');
        }
    }

    componentDidUpdate(prevState) {
        const titles = JSON.stringify(this.state.titles);
        const recipes = JSON.stringify(this.state.recipes);
        localStorage.setItem('titles', titles);
        localStorage.setItem('recipes', recipes);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="wrapper">
                    <Recipes 
                        titles={this.state.titles}
                        recipes={this.state.recipes}
                        add={this.toggleModal}
                        remove={this.remove}
                        removeAll={this.removeAll}
                    />
                    <AddRecipeModal 
                        open={this.state.modal} 
                        close={this.toggleModal} 
                        add={this.add}
                    />
                </div>
            </div>
        )
    }
}

export default RecipeBox;