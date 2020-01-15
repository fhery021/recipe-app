import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';

export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  isEmptyRecipeList() {
    return this.recipes.length === 0;
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    for (const recipe of recipes) {
      if (!recipe.ingredients) {
        recipe.ingredients = [];
      }
    }
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
