import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token: string;

    constructor(private router: Router) {}
    
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(err => console.log(err));
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                // console.log(res);
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    )
            })
            .catch(err => console.log(err));
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    isAuthenticated() {
        return this.token != null;
    }
}