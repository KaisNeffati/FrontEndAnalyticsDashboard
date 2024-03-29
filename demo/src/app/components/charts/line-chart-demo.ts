import { Component,OnInit } from '@angular/core';


import {UserByPlaceService} from '../services/user_by_place.service';

import {Observable} from 'rxjs/RX';

@Component({
  selector: 'line-chart-demo',
  templateUrl: './line-chart-demo.html',
  providers:[UserByPlaceService]
})
export class LineChartDemoComponent implements OnInit {

errorMessage: string;
constructor(private _userByPlaceService : UserByPlaceService){
}


ngOnInit():void{  

let tabOfLabels:string[]=[];
let tabOfdata:number[]=[];


  this._userByPlaceService.getBatch()
    .subscribe(user_by_place => {
                    tabOfdata=[];
                    tabOfLabels=[];
                    for(let i of user_by_place){
                          tabOfLabels.push(i.place);
                          tabOfdata.push(i.persons_by_place);
                    }
                    this.lineChartLabels=tabOfLabels;
                    this.lineChartData[0].data=tabOfdata;
                    },
                              error => this.errorMessage = <any>error);
  
      Observable.interval(5000).subscribe(()=>{
         this._userByPlaceService.getStream()
    .subscribe(user_by_place => {

      if(!this.checkIfSimilar(user_by_place)){      
                    tabOfdata=[];
                    tabOfLabels=[];
                    for(let i of user_by_place){
                          tabOfLabels.push(i.place);
                          tabOfdata.push(i.persons_by_place);
                    }
                    this.lineChartLabels=tabOfLabels;
                    this.lineChartData[1].data=tabOfdata;
    }
                    },
                              error => this.errorMessage = <any>error);
      }
      )
}
public checkIfSimilar(tab:Array<any>):boolean{
for(let i in tab){
  if(tab[i].persons_by_place!=this.lineChartData[1].data[i])
  {
    return false;
  }
}
return true;
}

  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Batch'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Streaming'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
