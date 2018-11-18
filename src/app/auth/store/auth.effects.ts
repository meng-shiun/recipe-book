import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNUP),
        map((action: AuthActions.TrySignup) => action.payload),
        switchMap(
            (authData: {username: string, password: string}) => 
            from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password))
        ),
        switchMap(
            () => from(firebase.auth().currentUser.getIdToken())
        ),
        mergeMap(
            (token: string) => [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ]
        )
    );
    
    @Effect()
    authSignin$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNIN),
        map((action: AuthActions.TrySignin) => action.payload),
        switchMap(
            (data: {username: string, password: string}) => 
            from(firebase.auth().signInWithEmailAndPassword(data.username, data.password))
        ),
        switchMap(
            () => from(firebase.auth().currentUser.getIdToken())
        ),
        mergeMap(
            (token: string) => {
                this.router.navigate(['/']);
                return [
                    {
                        type: AuthActions.SIGNIN
                    }, 
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ]
            }
        )
    );

    @Effect({dispatch: false})
    authSignout$: Observable<any> = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => this.router.navigate(['/']))
    );
        
    constructor(private actions$: Actions, private router: Router) {}
}