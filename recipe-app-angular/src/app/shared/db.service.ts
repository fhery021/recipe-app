import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private PROJECT_URL = 'https://ng-recipe-book-f326f.firebaseio.com/';
  private RECIPE_URL = this.PROJECT_URL + 'recipes.json';
  private NR_RETRY = 1;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  save() {
    return this.http.put(this.RECIPE_URL, this.recipeService.getRecipes())
      .pipe(
        retry(this.NR_RETRY),
        catchError(this.errorHandl)
      );
  }

  fetch() {
    return this.http.get(this.RECIPE_URL)
      .pipe(
        retry(this.NR_RETRY),
        catchError(this.errorHandl)
      );
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
