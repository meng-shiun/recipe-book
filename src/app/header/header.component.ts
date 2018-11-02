import { Component } from "@angular/core";

import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";

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
export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService) {}

    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe(
                data => console.log(data)
            );
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }
}