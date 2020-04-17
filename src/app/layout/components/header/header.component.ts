import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {DatePickerComponent} from '../../bs-component/components';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    dropdownList = [];
    selectedItems = [];
    dropdownSettings:IDropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    //@ViewChild(DatePickerComponent) datePicker: DatePickerComponent;
    constructor(private translate: TranslateService, public router: Router) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.dropdownList = [
            { item_id: 1, item_text: 'Brand 1' },
            { item_id: 2, item_text: 'Brand 2' },
            { item_id: 3, item_text: 'Brand 3' },
            { item_id: 4, item_text: 'Brand 4' },
            { item_id: 5, item_text: 'Brand 5' }
          ];
          this.selectedItems = [
            { item_id: 3, item_text: 'Brand 3' },
            { item_id: 4, item_text: 'Brand 4' }
          ];
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
