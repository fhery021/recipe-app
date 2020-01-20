import { FeatureState } from './../store/recipe.reducers';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  recipeState: Observable<fromRecipe.State>;

  constructor(
    private store: Store<fromRecipe.FeatureState>
  ) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }


  isLoggedIn() {
    return this.store.select('auth')
      .pipe(
        map((authState: fromAuth.State) => authState.authenticated)
      );
  }

}
