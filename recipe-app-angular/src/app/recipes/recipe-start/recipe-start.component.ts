import { AuthService } from './../../auth/auth.service';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  isEmptyRecipeList() {
    return this.recipeService.isEmptyRecipeList();
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

}
