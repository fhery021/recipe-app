import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { DbService } from '../../shared/db.service';
import { RecipeService } from '../../recipes/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(
    private dbService: DbService,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
  ) { }


  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  private loadData() {
    this.dbService
      .fetch()
      .subscribe(
        (data: Recipe[]) => {
          this.recipeService.setRecipes(data);
        }
      );
  }

  onFetch() {
    this.loadData();
  }

  onSaveData() {
    this.dbService
      .save()
      .subscribe(
        (response) => console.log(response)
      );
  }

  onLogOut() {
    this.authService.logout();
  }

}
