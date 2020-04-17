import { Component, OnInit } from '@angular/core';
 
// declare var remittances:Function;
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;
    collapedFilterBar: boolean;
    constructor() {}

    ngOnInit() {//drawBlackMap();
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
        //alert('left collaspe');
    }
    receiveFilterCollapsed($event) {
        this.collapedFilterBar = $event;
        //alert('filter collaspe');
    }
    receiveApplyFilterCollapsed($event) {
        alert('callme layout')
        //this.collapedFilterBar = $event;
        //alert('filter collaspe');
    }
}
