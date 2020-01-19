import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  @Effect()
  authSignUp = this.actions$
    .pipe(
      ofType(AuthActions.TRY_SIGN_UP),
      map((action: AuthActions.TrySignUp) => {
        return action.payload;
      }),
      switchMap((authData: { username: string, password: string }) => {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
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

  @Effect()
  authSignin = this.actions$
  .pipe(
    ofType(AuthActions.TRY_SIGNIN),
    map((action: AuthActions.TrySignUp) => {
      return action.payload;
    }),
    switchMap((authData: { username: string, password: string }) => {
      return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGN_IN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$
  .pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => this.router.navigate(['/']))
  );

  constructor(private actions$: Actions, private router: Router) { }

}
