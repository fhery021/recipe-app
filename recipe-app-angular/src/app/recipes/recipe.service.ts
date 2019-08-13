import { Recipe } from './recipe.model';

export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Avocado toast',
      'make a toast and put avocado on it',
      'https://wholefully.b-cdn.net/wp-content/uploads/2016/06/avocado-toast-10.jpg'),
    new Recipe('Fried egg',
      'Crack an egg and put it in boiling oil or fat',
      'https://live.staticflickr.com/2907/13916201522_7079f48d50_b.jpg')
  ];


  getRecipes() {
    // to not access the recipes list directly with the getter .slice() returns a copy of the array
    return this.recipes.slice();
  }
}
