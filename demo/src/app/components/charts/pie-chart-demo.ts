import { Component,OnInit } from '@angular/core';


import {UserByPlaceService} from '../services/user_by_place.service';
import {Observable} from 'rxjs/RX';


@Component({
  selector: 'pie-chart-demo',
  templateUrl: './pie-chart-demo.html',
  providers:[UserByPlaceService]
})
export class PieChartDemoComponent  implements OnInit {

errorMessage: string;
constructor(private _userByPlaceService : UserByPlaceService){
}

ngOnInit():void{  

 let tabOfdata:number[]=[];
 let tabOfLabels:string[]=[];
  this._userByPlaceService.getBatch()
    .subscribe(user_by_place => {
                    tabOfdata=[];
                    for(let i of user_by_place){
                          this.pieChartLabelsBatch.push(i.place);
                          tabOfdata.push(i.persons_by_place);
                    }
                    this.pieChartDataBatch=tabOfdata;
                    },
                              error => this.errorMessage = <any>error);
        

      Observable.interval(5000).subscribe(()=>{

  this._userByPlaceService.getStream()
    .subscribe(user_by_place => {
      if(!this.checkIfSimilar(user_by_place)){ 
                    tabOfdata=[];
                    for(let i of user_by_place){
                          tabOfdata.push(i.persons_by_place);
                    }
                    this.pieChartDataStreaming=tabOfdata;
                  
      }
                  },
                              error => this.errorMessage = <any>error);
                               }
      )
}

public checkIfSimilar(tab:Array<any>):boolean{
for(let i in tab){
  if(tab[i].persons_by_place!=this.pieChartDataStreaming[i])
  {
    return false;
  }
}
return true;
}

  // Pie Batch
  public pieChartLabelsBatch:string[] = [];
  public pieChartDataBatch:number[] = [300, 500, 100];
  public pieChartColors:any[] = [{
     backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(0 ,150, 136, 0.5)',
        'rgba(34, 253, 255, 0.5)',
        'rgba(237, 255, 0, 0.5)',
        'rgba(109, 67, 102, 0.5)'
     ] 
    }
    ];

  // Pie Streaming
  public pieChartLabelsStreaming:string[] = [];
  public pieChartDataStreaming:number[] = [300, 500, 100];


  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
