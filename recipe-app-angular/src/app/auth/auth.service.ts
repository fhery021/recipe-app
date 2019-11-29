import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  signUpUser(email: string, password: string) {
    return firebase.auth()
      .createUserWithEmailAndPassword(email, password);
  }

  signInUser(email: string, password: string) {
    return firebase.auth()
      .signInWithEmailAndPassword(email, password);
  }

}
