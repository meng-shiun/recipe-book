import { EventEmitter, Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe(
            'Cheese burger', 
            'Cheesy and yummy',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/800px-RedDot_Burger.jpg',
            [
                new Ingredient('Chesse', 1),
                new Ingredient('Meat', 1),
                new Ingredient('Buns', 2)
            ]),
        new Recipe(
            'Pasta', 
            'Home made pasta', 
            'https://res.cloudinary.com/norgesgruppen/image/upload/c_fill,f_auto,h_574,q_80,w_945/ayzgfdbzwndgnpfwgzf9.jpg',
            [
                new Ingredient('Pasta', 20),
                new Ingredient('Chicken', 3)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes = () => this.recipes.slice();

    getRecipe = (index: number) => this.recipes[index];

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}