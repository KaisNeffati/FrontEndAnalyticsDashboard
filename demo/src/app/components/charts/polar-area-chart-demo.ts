import { Component,OnInit } from '@angular/core';


import {UserByPlaceService} from '../services/user_by_place.service';

import {Observable} from 'rxjs/RX';

@Component({
  selector: 'polar-area-chart-demo',
  templateUrl: './polar-area-chart-demo.html',
    providers:[UserByPlaceService]
})
export class PolarAreaChartDemoComponent implements OnInit {


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
                          this.polarAreaChartLabelsBatch.push(i.place);
                          console.log(i.place);
                          tabOfdata.push(i.persons_by_place);
                    }
                    this.polarAreaChartDataBatch=tabOfdata;
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
                    this.polarAreaChartDataStreaming=tabOfdata;
      }
                    },
                              error => this.errorMessage = <any>error);   
                                    }
      )          
}

public checkIfSimilar(tab:Array<any>):boolean{
for(let i in tab){
  if(tab[i].persons_by_place!=this.polarAreaChartDataStreaming[i])
  {
    return false;
  }
}
return true;
}

  // PolarArea
  public polarAreaChartLabelsBatch:string[] = [];
  public polarAreaChartDataBatch:number[] = [300, 500, 100, 40, 120];
  public polarAreaChartLabelsStreaming:string[] = [];
  public polarAreaChartDataStreaming:number[] = [300, 500, 100, 40, 120];
  public polarAreaChartColors:any[] = [{
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
  
  
  public polarAreaLegend:boolean = true;

  public polarAreaChartType:string = 'polarArea';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
