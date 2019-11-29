import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Subject, of, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private PROJECT_URL = 'https://ng-recipe-book-f326f.firebaseio.com/';
  private RECIPE_URL = this.PROJECT_URL + 'recipes.json';


  public errors: Subject<string> = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  save() {
    const token = this.authService.getToken();
    return this.http
      .put(
        this.RECIPE_URL + '?auth=' + token,
        this.recipeService.getRecipes()
      );
  }

  fetch() {
    const token = this.authService.getToken();
    return this.http
      .get(
        this.RECIPE_URL + '?auth=' + token
      );
  }
}
