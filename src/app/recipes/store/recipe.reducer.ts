import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from "./recipe.actions";
import * as fromApp from "../../store/app.reducers";

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[]
}

export const initialState: State = {
    recipes: [
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
    ]
};

export function recipesReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipeActions.UPDATE_RECIPE:
            const updatedRecipe = state.recipes.map((recipe, i) => {
                (i === action.payload.id) && (recipe = action.payload.recipe)
                return recipe;
            });
            return {
                ...state,
                recipes: updatedRecipe
            };
        case RecipeActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, i) => i !== action.payload)
            };
        default:
            return state;
    }
}