import { DbService } from './shared/db.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedFeature = 'recipe';

  errorSubscription: Subscription;
  errors = '';

  constructor(private dbService: DbService) { }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }


  ngOnInit(): void {
    this.errorSubscription = this.dbService
      .fetch()
      .subscribe(
        (data) => { },
        (error) => this.errors = error
      );

    this.errorSubscription = this.dbService
      .save()
      .subscribe(
        (data) => { },
        (error) => this.errors = error
      );

  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }


}
