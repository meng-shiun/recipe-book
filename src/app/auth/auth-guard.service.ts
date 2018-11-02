import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private authServie: AuthService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authServie.isAuthenticated();
    }
}