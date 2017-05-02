import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ChartsSectionComponent} from '../components/charts-section';
import {UsersMangementComponent} from '../components/users/users.component';
import {PromotionsMangementComponent} from '../components/promotions/promotions.component';
import {MapComponent} from '../components/map/map.component';


@NgModule({
    imports:[
        RouterModule.forRoot([
            { path: 'map', component: MapComponent },
            { path: 'users', component: UsersMangementComponent },
            { path: 'promotions', component: PromotionsMangementComponent },
            { path: '', component: ChartsSectionComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ])
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}