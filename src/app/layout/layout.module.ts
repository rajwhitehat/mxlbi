import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule,NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import {DatePickerComponent} from './bs-component/components';
import { BsComponentModule } from './bs-component/bs-component.module';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterbarComponent } from './components/filterbar/filterbar.component';
import { FormsModule } from '@angular/forms';
// import {
//     AlertComponent,
//     ButtonsComponent,
//     ModalComponent,
//     CollapseComponent,
//     DatePickerComponent,
//     DropdownComponent,
//     PaginationComponent,
//     PopOverComponent,
//     ProgressbarComponent,
//     TabsComponent,
//     RatingComponent,
//     TooltipComponent,
//     TimepickerComponent
// } from './components';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataUtilityComponent } from './data-utility/data-utility.component';
import { IndiamapchartComponent } from './components/indiamapchart/indiamapchart.component';
import { TablechartComponent } from './components/tablechart/tablechart.component';


//import { ChartallotmentComponent } from './chartallotment/chartallotment.component';
//import { DoubleverticalchartComponent } from './components/doubleverticalchart/doubleverticalchart.component';
//import { SunbrustchartComponent } from './components/sunbrustchart/sunbrustchart.component';

//import { LinechartComponent } from './components/linechart/linechart.component';
//import { SnippetsComponent } from './components/snippets/snippets.component';
// import { SurveyComponent } from './survey/survey.component';
// import { SmprofileComponent } from './smprofile/smprofile.component';
@NgModule({
    imports: [FormsModule,
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,NgbModule
        ,NgMultiSelectDropDownModule.forRoot()
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, FilterbarComponent, DataUtilityComponent/*,DatePickerComponent,NgbDatepicker*/]
})
export class LayoutModule {}
