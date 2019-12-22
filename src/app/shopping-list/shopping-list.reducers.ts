import { Ingredient } from './../shared/Ingredient.model';
import { Action } from '@ngrx/store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const initialState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  // switch (action.type) {
  //   case ADD_INGREDIENT:
  //     return {
  //       ...state,
  //       ingredients: [...state.ingredients, action.]
  //     }
  // }
  return state;
}
