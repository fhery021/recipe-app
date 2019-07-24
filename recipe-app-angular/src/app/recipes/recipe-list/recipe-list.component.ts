import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Avocado toast', 'make a toast and put avocado on it',
    'https://wholefully.b-cdn.net/wp-content/uploads/2016/06/avocado-toast-10.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
