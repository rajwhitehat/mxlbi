import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
    model: any;
    constructor() { }

    ngOnInit() {
    }

}
