import { Injectable } from "@angular/core";
import { 
    HttpInterceptor, HttpEvent, HttpRequest, HttpHandler 
} from "@angular/common/http";

import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { switchMap, take } from "rxjs/operators";

import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../auth/store/auth.reducer";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);

        return this.store.pipe(
            select('auth'),
            take(1),
            switchMap(
                (authState: fromAuth.State) => {
                    const copiedReq = req.clone({ params: req.params.set('auth', authState.token) });
                    return next.handle(copiedReq)
                }
            )
        )
    }
}