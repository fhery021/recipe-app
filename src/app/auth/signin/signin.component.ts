import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
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

    this.authService.signInUser(email, password)
      .then(() => {
        this.messages = 'Sign in successful';
        this.router.navigate(['/']);
      })
      .catch(
        (error) => this.errorHandlerService.errorOccured(error)
      );

  }
}
