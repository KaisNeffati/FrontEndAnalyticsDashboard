import { Component,OnInit } from '@angular/core';


import {UserByPlaceService} from '../services/user_by_place.service';

import {Observable} from 'rxjs/RX';


@Component({
  selector: 'bar-chart-demo',
  templateUrl: './bar-chart-demo.html',
  providers:[UserByPlaceService]
})
export class BarChartDemoComponent implements OnInit {

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
                    this.barChartLabels=tabOfLabels;
                    this.barChartData[0].data=tabOfdata;
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
                    this.barChartLabels=tabOfLabels;
                    this.barChartData[1].data=tabOfdata;
       }
                    },
                              error => this.errorMessage = <any>error);
}
      )

                              
}

public checkIfSimilar(tab:Array<any>):boolean{
for(let i in tab){
  if(tab[i].persons_by_place!=this.barChartData[1].data[i])
  {
    return false;
  }
}
return true;
}

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2015'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Batch'},
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Stream'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
