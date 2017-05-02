import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Promotion } from '../entities/promotion';

@Injectable()
export class PromotionService {
headers      = new Headers({ 'Content-Type': 'application/json' }); 


constructor(private _http: Http) { 
}

private _PromotionUrl = 'http://localhost:8090/promotion';

getPromotions():Observable<Promotion[]>{
             return this._http.get(this._PromotionUrl)
            .map((response: Response) => <Promotion[]> response.json())
            .do(data=>console.log('All: '+JSON.stringify(data)))
            .catch(this.handleError);
    }
addPromotion (promotion: Promotion): Promise<Promotion> {
    return this._http
    .post(this._PromotionUrl, JSON.stringify(promotion), {headers: this.headers})
    .toPromise()
    .then(res => res.json().data as Promotion)
    .catch(this.handleError);
    }   
update(promotion: Promotion): Promise<Promotion> {
  return this._http
    .put(this._PromotionUrl, JSON.stringify(promotion), {headers: this.headers})
    .toPromise()
    .then(() => promotion)
    .catch(this.handleError);
}

deletePromotion (id:string): Promise<Promotion> {
  const url = `${this._PromotionUrl}/${id}`;
  return this._http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }   

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}