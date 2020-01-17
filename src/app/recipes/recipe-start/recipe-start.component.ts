import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  constructor(
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
  }

  isEmptyRecipeList() {
    return this.recipeService.isEmptyRecipeList();
  }

  isLoggedIn() {
    return this.store.select('auth')
      .pipe(
        map((authState: fromAuth.State) => authState.authenticated)
      );
  }

}
