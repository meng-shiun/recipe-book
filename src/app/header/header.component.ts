import { Component } from "@angular/core";

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
}