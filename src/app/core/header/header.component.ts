import { AuthService } from '../../auth/auth.service';
import { DbService } from '../../shared/db.service';
import { RecipeService } from '../../recipes/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    private dbService: DbService,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }


  ngOnInit() {
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

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onLogOut() {
    this.authService.logout();
  }

}
