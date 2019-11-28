import { ErrorHandlerService } from './shared/error-handler.service';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';
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

  constructor(private errorHandlerService: ErrorHandlerService) { }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }


  ngOnInit(): void {
    this.errorSubscription = this.errorHandlerService.errorSubject.subscribe(err => this.errors = err);
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }


}
