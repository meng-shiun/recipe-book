import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [`
        .navbar-nav {
            margin-right: 80px;
        }
    `]
})
export class HeaderComponent {
    @Output() featureSelected: EventEmitter<string> = new EventEmitter();

    onSelect(feat: string) {
        this.featureSelected.emit(feat);
    }

}