import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private store: Store<fromApp.AppState>
  ) { }

  messages = '';

  ngOnInit() {
    this.messages = '';
  }

  onSignIn(form: NgForm) {
    this.errorHandlerService.clearError();
    this.messages = '';

    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.TrySignin({username: email, password: password}));

  }
}
