import * as ShoppingList from './shopping-list.actions';

import { Ingredient } from "src/app/shared/ingredient.model";

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientId: number
}

export const initialState: State = {
    ingredients: [
        new Ingredient('Egg', 12),
        new Ingredient('Apple', 5)
    ],
    editedIngredient: null,
    editedIngredientId: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingList.ShoppingListActions) {
    switch (action.type) {
        case ShoppingList.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingList.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingList.UPDATE_INGREDIENT:
            const updatedIngredients = state.ingredients.map((el, i) => {
                (i === state.editedIngredientId) && (el = action.payload.ingredient);
                return el;
            });
            return {
                ...state,
                ingredients: updatedIngredients
            };
        case ShoppingList.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((val, i) => i !== state.editedIngredientId)
            };
        case ShoppingList.START_EDIT:
            return {
                ...state,
                editedIngredient: state.ingredients.map(el => el)[action.payload],
                editedIngredientId: action.payload
            };
        case ShoppingList.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientId: -1
            };
        default:
            return state;
    }
}