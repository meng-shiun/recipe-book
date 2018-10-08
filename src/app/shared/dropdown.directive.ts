import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {

    constructor(private elementRef: ElementRef) { }

    // @HostBinding('class.show') isOpen: boolean = false;
    isOpen: boolean = false;

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
        this.toggleMenu(this.isOpen);
    }

    toggleMenu(condition: boolean) {
        const menu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
        condition ? menu.classList.add('show') : menu.classList.remove('show');
    }

}