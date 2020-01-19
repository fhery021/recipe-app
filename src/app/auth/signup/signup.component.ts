import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from './../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>,
    private errorHandlerService: ErrorHandlerService
  ) { }

  messages = '';

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    this.errorHandlerService.clearError();
    this.messages = '';

    const email = form.value.email;
    const pwd = form.value.password;

    this.store.dispatch(new AuthActions.TrySignUp({username: email, password: pwd}));
  }
}
