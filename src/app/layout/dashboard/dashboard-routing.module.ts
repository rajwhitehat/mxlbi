import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {SmprofileComponent} from '../smprofile/smprofile.component';
import {SurveyComponent} from '../survey/survey.component';
import {SnippetsComponent} from '../components/snippets/snippets.component';
import { DoubleverticalchartComponent } from '../components/doubleverticalchart/doubleverticalchart.component';
import { CalenderheatchartComponent } from '../components/calenderheatchart/calenderheatchart.component';
import { SunbrustchartComponent } from '../components/sunbrustchart/sunbrustchart.component';
import {ChartallotmentComponent} from '../chartallotment/chartallotment.component'
import { StatechartComponent } from '../components/statechart/statechart.component';
import { LitopeelchartComponent } from '../components/litopeelchart/litopeelchart.component';
import { ChordgraphComponent } from '../components/chordgraph/chordgraph.component';
import { AdspendComponent } from '../components/adspend/adspend.component';
import { Litopil1chartComponent } from '../components/litopil1chart/litopil1chart.component';
import { HiphopComponent } from '../components/hiphop/hiphop.component';
import { HirarchicalBarChartComponent } from '../components/hirarchical-bar-chart/hirarchical-bar-chart.component';
import { LinechartasComponent } from '../components/linechartas/linechartas.component';
import { BarchartComponent } from '../components/barchart/barchart.component';
import { BarreversechartComponent } from '../components/barreversechart/barreversechart.component';
import { VerticalstackedbarComponent } from '../components/verticalstackedbar/verticalstackedbar.component';
import { GroupbarchartComponent } from '../components/groupbarchart/groupbarchart.component';
import { ZoomablecirclepackingComponent } from '../components/zoomablecirclepacking/zoomablecirclepacking.component';
//import { GeoMercatorComponent } from '../components/geo-mercator/geo-mercator.component';
import {SalesanalysisComponent} from '../salesanalysis/salesanalysis.component';

const routes: Routes = [
        {path: '', component: DashboardComponent},
        {path: 'smprofiling', component: SmprofileComponent},        
        {path: 'survey', component: SurveyComponent},
        {path: 'lito', component: LitopeelchartComponent},
        {path: 'snippets', component: ChordgraphComponent},
        {path: 'chartallotment', component: ChartallotmentComponent},
        {path: 'leto1', component: Litopil1chartComponent},
        {path:'adspend',component:AdspendComponent},
        {path:'hiphop',component:HiphopComponent},
        {path:'hir',component:HirarchicalBarChartComponent},
        {path:'double',component:DoubleverticalchartComponent},
        {path:'line1',component:LinechartasComponent},
        {path:'bar',component:BarchartComponent},
        {path:'barreverse',component:BarreversechartComponent},
        {path:'vertical',component:VerticalstackedbarComponent}, 
       // {path:'geo',component:GeoMercatorComponent},  
        {path:'zoom',component:ZoomablecirclepackingComponent},
        {path:'salesanalysis',component:SalesanalysisComponent}                                     
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
