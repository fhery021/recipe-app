import { ErrorHandlerService } from './shared/error-handler.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';

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
    this.errorSubscription = this.errorHandlerService
      .errorSubject
      .subscribe(err => this.errors = err);

    firebase.initializeApp({
      apiKey: 'AIzaSyDPHvctjXdV-Wjh1nM3VOVU7fpdSPa56LA',
      authDomain: 'ng-recipe-book-f326f.firebaseapp.com'
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }


}
