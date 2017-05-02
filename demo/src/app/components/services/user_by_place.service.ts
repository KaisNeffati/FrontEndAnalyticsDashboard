import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { UserByPlace } from '../entities/user_by_place';

@Injectable()
export class UserByPlaceService {
    

constructor(private _http: Http) { 
}

private _BatchUrl = 'http://localhost:8080/Batch';
private _StreamUrl = 'http://localhost:8080/Stream';

getBatch(){
             return this._http.get(this._BatchUrl)
            .map((response: Response) => <UserByPlace[]> response.json())
            .do(data=>console.log('All: '+JSON.stringify(data)))
            .catch(this.handleError);
    }
getStream(){
   return this._http.get(this._StreamUrl)
            .map((response: Response) => <UserByPlace[]> response.json())
            .do(data=>console.log('All: '+JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}