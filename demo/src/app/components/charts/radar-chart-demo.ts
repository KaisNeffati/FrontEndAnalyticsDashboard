import { Component,OnInit } from '@angular/core';


import {UserByPlaceService} from '../services/user_by_place.service';

import {Observable} from 'rxjs/RX';

@Component({
  selector: 'radar-chart-demo',
  templateUrl: './radar-chart-demo.html',
  providers:[UserByPlaceService]
})
export class RadarChartDemoComponent {


errorMessage: string;
constructor(private _userByPlaceService : UserByPlaceService){
}

ngOnInit():void{  
  this._userByPlaceService.getBatch()
    .subscribe(user_by_place => {
                    let tabOfLabels:string[]=[];
                    let tabOfdata:number[]=[];
                    for(let i of user_by_place){
                          tabOfLabels.push(i.place);
                          tabOfdata.push(i.persons_by_place);
                    }
                    this.radarChartLabels=tabOfLabels;
                    this.radarChartData[0].data=tabOfdata;
                    },
                              error => this.errorMessage = <any>error);

      Observable.interval(5000).subscribe(()=>{

  this._userByPlaceService.getStream()
    .subscribe(user_by_place => {
      if(!this.checkIfSimilar(user_by_place)){

                    let tabOfLabels:string[]=[];
                    let tabOfdata:number[]=[];
                    for(let i of user_by_place){
                          tabOfLabels.push(i.place);
                          tabOfdata.push(i.persons_by_place);
                    }
                    this.radarChartLabels=tabOfLabels;
                    this.radarChartData[1].data=tabOfdata;
      }
                    },
                              error => this.errorMessage = <any>error);
                              }
      )
}


public checkIfSimilar(tab:Array<any>):boolean{
for(let i in tab){
  if(tab[i].persons_by_place!=this.radarChartData[1].data[i])
  {
    return false;
  }
}
return true;
}

  // Radar
  public radarChartLabels:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Batch'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Streaming'}
  ];
  public radarChartType:string = 'radar';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
