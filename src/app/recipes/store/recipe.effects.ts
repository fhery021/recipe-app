import { FETCH_RECIPES } from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';


@Injectable()
export class RecipeEffects {

  private readonly PROJECT_URL = 'https://ng-recipe-book-f326f.firebaseio.com/';
  private readonly RECIPE_URL = this.PROJECT_URL + 'recipes.json';

  @Effect()
  recipeFetch = this.actions$
    .pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap((action: RecipeActions.FetchRecipes) => {
        return this.httpClient
          .get<Recipe[]>(
            this.RECIPE_URL,
            {
              observe: 'body',
              responseType: 'json'
            }
          );
      }),
      map(
        (recipes) => {
          console.log(recipes);
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
          return {
            type: RecipeActions.SET_RECIPES,
            payload: recipes
          };
        }
      )
    );

  @Effect({ dispatch: false })
  recipeStore = this.actions$
    .pipe(
      ofType(RecipeActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', this.RECIPE_URL, state.recipes, { reportProgress: true });
        return this.httpClient.request(req);
      })
    );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>) { }
}

