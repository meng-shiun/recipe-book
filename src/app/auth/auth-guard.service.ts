import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import * as fromApp from "../store/app.reducers";
import * as fromAuth from "./store/auth.reducer";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private store: Store<fromApp.AppState>) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.pipe(
            select('auth'),
            take(1),
            map((authState: fromAuth.State) => authState.authenticated)
        );
    }
}