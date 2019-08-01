import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Avocado toast',
      'make a toast and put avocado on it',
      'https://wholefully.b-cdn.net/wp-content/uploads/2016/06/avocado-toast-10.jpg'),
    new Recipe('Fried egg',
      'Crack an egg and put it in boiling oil or fat',
      'https://live.staticflickr.com/2907/13916201522_7079f48d50_b.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
