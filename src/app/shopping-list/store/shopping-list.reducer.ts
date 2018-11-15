import * as ShoppingList from './shopping-list.actions';

import { Ingredient } from "src/app/shared/ingredient.model";

export interface AppState {
    shoppingList: State
}

interface State {
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
            console.log(action.type, action.payload)
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingList.ADD_INGREDIENTS:
            console.log(action.type, action.payload)
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingList.UPDATE_INGREDIENT:
            const updatedIngredients = state.ingredients.map((el, i) => {
                (i === state.editedIngredientId) && (el = action.payload.ingredient);
                return el;
            });
            console.log(action.type,'\n from:', state, '\n to: ', {...state, ingredients: updatedIngredients});
            return {
                ...state,
                ingredients: updatedIngredients
            };
        case ShoppingList.DELETE_INGREDIENT:
            console.log(action.type, 'index: ', state.editedIngredientId)
            return {
                ...state,
                ingredients: state.ingredients.filter((val, i) => i !== state.editedIngredientId)
            };
        case ShoppingList.START_EDIT:
            console.log(action.type, state.ingredients.map(el => el)[action.payload])
            return {
                ...state,
                editedIngredient: state.ingredients.map(el => el)[action.payload],
                editedIngredientId: action.payload
            };
        case ShoppingList.STOP_EDIT:
            console.log(action.type)
            return {
                ...state,
                editedIngredient: null,
                editedIngredientId: -1
            };
        default:
            return state;
    }
}