import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly PROJECT_URL = 'https://ng-recipe-book-f326f.firebaseio.com/';
  private readonly RECIPE_URL = this.PROJECT_URL + 'recipes.json';

  public errors: Subject<string> = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  save() {
    const req = new HttpRequest('PUT', this.RECIPE_URL, this.recipeService.getRecipes(),
      { reportProgress: true });

    return this.http.request(req);

    // return this.http
    //   .put(
    //     this.RECIPE_URL,
    //     this.recipeService.getRecipes(),
    //     { params: this.getHttpParams() }
    //   );
  }

  fetch() {
    return this.http
      .get<Recipe[]>(this.RECIPE_URL);
  }


}
