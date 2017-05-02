import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ChartsSectionComponent } from './components/charts-section';
import { LineChartDemoComponent } from './components/charts/line-chart-demo';
import { BarChartDemoComponent } from './components/charts/bar-chart-demo';
import { DoughnutChartDemoComponent } from './components/charts/doughnut-chart-demo';
import { PieChartDemoComponent } from './components/charts/pie-chart-demo';
import { PolarAreaChartDemoComponent } from './components/charts/polar-area-chart-demo';
import { RadarChartDemoComponent } from './components/charts/radar-chart-demo';
import { BaseChartDemoComponent } from './components/charts/base-chart-demo';
import { ChartSectionComponent } from './components/chart-section.component';

import { MapComponent } from './components/map/map.component';

import {MdlModule} from 'angular2-mdl';
import { HttpModule } from '@angular/http';

import { TabsModule, CollapseModule, DropdownModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';

import {UsersMangementComponent} from './components/users/users.component';
import {PromotionsMangementComponent} from './components/promotions/promotions.component';

import { AppRoutingModule } from './routing/app-routing.module';

import {TableDemoComponent} from './components/table/table.component';

import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';

import {NgxPaginationModule} from 'ngx-pagination';

import { NguiMapModule} from '@ngui/map';


import {columnPipe,rowPipe,searchPipe} from './components/pipes/filter';

@NgModule({
      providers:[
        { provide: APP_BASE_HREF, useValue: '/' }
    ],
  bootstrap: [AppComponent],
  declarations: [
    columnPipe,
    rowPipe,
    searchPipe,
    ChartSectionComponent,
    AppComponent,
    ChartsSectionComponent,
    LineChartDemoComponent,
    BarChartDemoComponent,
    DoughnutChartDemoComponent,
    PieChartDemoComponent,
    PolarAreaChartDemoComponent,
    RadarChartDemoComponent,
    BaseChartDemoComponent,
    UsersMangementComponent,
    PromotionsMangementComponent,
    TableDemoComponent,
    MapComponent,
  ],
  imports: [
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBJzhJxvOQwmGbJYZ6WboHaoGbyC2WqkYg'}),
    NgxPaginationModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MdlModule,
    HttpModule,
    ChartsModule,
    AppRoutingModule,
    Ng2TableModule,
    PaginationModule,
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    DropdownModule.forRoot(),
    PaginationModule.forRoot()
  ]
})
export class AppModule {
}
