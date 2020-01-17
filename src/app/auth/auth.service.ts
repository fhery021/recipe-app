import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as fromApp from '../store/app.reducers';
import * as authActions from './store/auth.actions';

@Injectable()
export class AuthService {

  constructor(private store: Store<fromApp.AppState>) {

  }

  // token: string = null;

  signUpUser(email: string, password: string) {
    return firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new authActions.SignUp());
          firebase.auth().currentUser.getIdToken()
            .then(
              (tkn: string) => this.store.dispatch(new authActions.SetToken(tkn))
            );

        }
      );
  }

  signInUser(email: string, password: string) {
    return firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {
          this.store.dispatch(new authActions.SignIn());
          firebase.auth().currentUser.getIdToken()
            .then(
              (tkn: string) => this.store.dispatch(new authActions.SetToken(tkn))
            );
        }
      );
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new authActions.LogOut());
  }
}
