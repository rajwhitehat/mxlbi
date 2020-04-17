import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
// Import angular-fusioncharts
import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as Widgets from "fusioncharts/fusioncharts.widgets";
import * as FusionMaps from "fusioncharts/fusioncharts.maps";
import * as World from "fusionmaps/maps/fusioncharts.world";
import { GeoMercatorComponent } from '../components/geo-mercator/geo-mercator.component';
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Pass the fusioncharts library and chart modules
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

FusionChartsModule.fcRoot(FusionCharts, Widgets, FusionTheme, FusionMaps, World);
@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, Ng2Charts, ChartsRoutingModule, 
        PageHeaderModule, FusionChartsModule,  NgMultiSelectDropDownModule.forRoot()],
    declarations: [ChartsComponent,GeoMercatorComponent]
})
export class ChartsModule {}
