import { Component, OnInit } from '@angular/core';

import {AccountService} from '../services/account.service';

import {Observable} from 'rxjs/RX';

@Component({
    selector: 'map',
    templateUrl: 'map.component.html',
    styleUrls:['map.component.css'],
    providers: [AccountService]
})
export class MapComponent implements OnInit{
positions = [];
errorMessage:string;

   constructor(private _AccountService: AccountService ) { }

  ngOnInit():void{
    Observable.interval(5000).subscribe(()=>{
this._AccountService.getAccounts()    
        .subscribe(users => {
          this.positions=[];
          users.forEach(u=>this.positions.push([u.longitude,u.latitude]));
          console.log(this.positions);
                    },
                              error => this.errorMessage = <any>error);
  });
}
  showRandomMarkers() {
    let randomLat: number, randomLng: number;
    this.positions = [];
    for (let i = 0 ; i < 9; i++) {
      randomLat = Math.random() * 0.0099 + 43.7250;
      randomLng = Math.random() * 0.0099 + -79.7699;
      this.positions.push([randomLat, randomLng]);
    }
  }
  addMarker() {
    let randomLat = Math.random() * 0.0099 + 43.7250;
    let randomLng = Math.random() * 0.0099 + -79.7699;
    this.positions.push([randomLat, randomLng]);
  }
}