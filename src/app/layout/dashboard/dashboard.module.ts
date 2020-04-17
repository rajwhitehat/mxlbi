import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SmprofileComponent } from '../../layout/smprofile/smprofile.component';
import { SurveyComponent } from '../../layout/survey/survey.component';
import { DashboardComponent } from './dashboard.component';
import { HirarchicalBarChartComponent } from '../components/hirarchical-bar-chart/hirarchical-bar-chart.component';
import { BarchartComponent } from '../components/barchart/barchart.component';
//import { GeoMercatorComponent } from '../components/geo-mercator/geo-mercator.component';

import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { LitopeelchartComponent } from '../components/litopeelchart/litopeelchart.component';
import { ChordgraphComponent } from '../components/chordgraph/chordgraph.component';

import { StatechartComponent } from '../components/statechart/statechart.component';
import { AdspendComponent } from '../components/adspend/adspend.component';
import {SalesanalysisComponent} from '../salesanalysis/salesanalysis.component';
import { StatModule } from '../../shared';
import { FusionChartsModule } from 'angular-fusioncharts';
import { CalendarHeatmap } from 'angular2-calendar-heatmap';
// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import * as FusionMaps from 'fusioncharts/fusioncharts.maps';
import * as India from 'fusionmaps/maps/fusioncharts.india';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {SnippetsComponent} from '../components/snippets/snippets.component';
import { LinechartComponent } from '../components/linechart/linechart.component';
import { CalenderheatchartComponent } from '../components/calenderheatchart/calenderheatchart.component';
import { SunbrustchartComponent } from '../components/sunbrustchart/sunbrustchart.component';
import { DoubleverticalchartComponent } from '../components/doubleverticalchart/doubleverticalchart.component';
import { IndiamapchartComponent } from '../components/indiamapchart/indiamapchart.component';
import { TablechartComponent } from '../components/tablechart/tablechart.component';
import {ChartallotmentComponent} from '../chartallotment/chartallotment.component'
//import { AgGridModule } from 'ag-grid-angular';
//import { AgGridModule }  from "ag-grid-community";
//import {AgGridModule} from "node_modules/ag-grid-community";
//import { AllCommunityModules }  from "ag-grid-angular";
//import {Grid} from 'ag-grid';
import { GroupbarchartComponent } from '../components/groupbarchart/groupbarchart.component';

import { Litopil1chartComponent } from '../components/litopil1chart/litopil1chart.component';
import { Ng5SliderModule } from 'ng5-slider';
import { HiphopComponent } from '../components/hiphop/hiphop.component';
// import {DragDropModule} from '@angular/cdk/drag-drop';
import { LinechartasComponent } from '../components/linechartas/linechartas.component';
import { BarreversechartComponent } from '../components/barreversechart/barreversechart.component';
import { VerticalstackedbarComponent } from '../components/verticalstackedbar/verticalstackedbar.component';
import { ZoomablecirclepackingComponent } from '../components/zoomablecirclepacking/zoomablecirclepacking.component';

import {AgGridModule} from "@ag-grid-community/angular";
import { DndListModule } from 'ngx-drag-and-drop-lists';
FusionChartsModule.fcRoot(FusionCharts, Widgets, FusionTheme,FusionMaps,India);
@NgModule({
    imports: [
        FormsModule,/*DragDropModule,*/DndListModule,
        ReactiveFormsModule,
        CommonModule,
        NgbCarouselModule,
        Ng5SliderModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule,Ng2Charts,FusionChartsModule,
        NgMultiSelectDropDownModule.forRoot(),
        AgGridModule.withComponents([])        
    ],
    declarations: [CalendarHeatmap,Litopil1chartComponent,LitopeelchartComponent,
        DashboardComponent,AdspendComponent,
        TimelineComponent,
        NotificationComponent,HiphopComponent,
        ChatComponent,
        SmprofileComponent,
        SurveyComponent,SnippetsComponent,SalesanalysisComponent,ZoomablecirclepackingComponent,GroupbarchartComponent,VerticalstackedbarComponent,BarreversechartComponent,BarchartComponent,LinechartasComponent,ChordgraphComponent,StatechartComponent,ChartallotmentComponent,HirarchicalBarChartComponent,LinechartComponent,TablechartComponent,IndiamapchartComponent,DoubleverticalchartComponent,SunbrustchartComponent,CalenderheatchartComponent
    ]
})
export class DashboardModule {}
