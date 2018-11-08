import { Injectable } from "@angular/core";
import { 
    HttpInterceptor, HttpEvent, HttpRequest, HttpHandler 
} from "@angular/common/http";

import { Observable } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);

        const copiedReq = req.clone({ 
            params: req.params.set('auth', this.authService.getToken())
        });
        return next.handle(copiedReq);
    }
}