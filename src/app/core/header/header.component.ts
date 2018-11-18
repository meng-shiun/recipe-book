import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { DataStorageService } from "../../shared/data-storage.service";
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [`
        .navbar-nav {
            margin-right: 80px;
        }

        .active-tab {
            background-color: #595b63 !important;
        }
    `]
})
export class HeaderComponent implements OnInit {
    authState$: Observable<fromAuth.State>;

    constructor(private dataStorageService: DataStorageService,
                private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.authState$ = this.store.pipe(select('auth'));
    }

    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe(
                data => console.log(data)
            );
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
}