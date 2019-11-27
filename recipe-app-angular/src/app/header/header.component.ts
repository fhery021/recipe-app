import { DbService } from './../shared/db.service';
import { RecipeService } from './../recipes/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    private dbService: DbService,
    private recipeService: RecipeService
  ) { }


  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.dbService
      .fetch()
      .subscribe(
        (data: any[]) => {
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
        (response: Response) => console.log(response)
      );
  }

}
