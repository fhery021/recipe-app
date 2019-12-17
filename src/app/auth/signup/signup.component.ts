import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  messages = '';

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    this.errorHandlerService.clearError();
    this.messages = '';

    const email = form.value.email;
    const password = form.value.password;

    this.authService.signUpUser(email, password)
      .then( () => this.messages = 'Sign up successful')
      .catch(
        (error) => this.errorHandlerService.errorOccured(error)
      );
  }
}
