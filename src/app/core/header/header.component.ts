import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DbService } from '../../shared/db.service';
import { RecipeService } from '../../recipes/recipe.service';
import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(
    private dbService: DbService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>,
  ) { }


  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onFetch() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
