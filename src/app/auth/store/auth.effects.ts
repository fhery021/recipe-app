import { map, switchMap, mergeMap } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';
import { from } from 'rxjs';

@Injectable()
export class AuthEffects {

  // OMG, this is horrible

  @Effect()
  authSignUp = this.action$
    .pipe(
      ofType(AuthActions.TRY_SIGN_UP)
    )
    .pipe(
      map((action: AuthActions.TrySignUp) => {
        return action.payload;
      })
    )
    .pipe(
      switchMap((authData: { username: string, password: string }) => {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      })
    )
    .pipe(
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      })
    )
    .pipe(
      mergeMap((token: string) => {
        return [
          {
            type: AuthActions.SIGN_UP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

    // @Effect()
    // authSignIn = this.actions@

  constructor(private action$: Actions) { }

  // this.authService.signUpUser(email, password)
  //   .then( () => this.messages = 'Sign up successful')
  //   .catch(
  //     (error) => this.errorHandlerService.errorOccured(error)
  //   );

}
