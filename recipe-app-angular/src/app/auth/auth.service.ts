import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  token: string = null;

  signUpUser(email: string, password: string) {
    return firebase.auth()
      .createUserWithEmailAndPassword(email, password);
  }

  signInUser(email: string, password: string) {
    return firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      );
  }

  getToken() {
    if (firebase.auth().currentUser === null) {
      this.token = null;
      return null;
    }
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
