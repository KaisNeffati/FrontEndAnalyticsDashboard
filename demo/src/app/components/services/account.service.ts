import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { User } from '../entities/user';

@Injectable()
export class AccountService {
headers      = new Headers({ 'Content-Type': 'application/json' }); 

constructor(private _http: Http) { 
}

private _AccountUrl = 'http://localhost:8080/account';

getAccounts():Observable<User[]>{
             return this._http.get(this._AccountUrl)
            .map((response: Response) => <User[]> response.json())
            .do(data=>console.log('All: '+JSON.stringify(data)))
            .catch(this.handleError);
    }
 addUser (user: User): Promise<User> {
    return this._http
    .post(this._AccountUrl, JSON.stringify(user), {headers: this.headers})
    .toPromise()
    .then(res => res.json().data as User)
    .catch(this.handleError);
    }   
update(user: User): Promise<User> {
  return this._http
    .put(this._AccountUrl, JSON.stringify(user), {headers: this.headers})
    .toPromise()
    .then(() => user)
    .catch(this.handleError);
}

deleteUser (userName:string): Promise<User> {
  const url = `${this._AccountUrl}/${userName}`;
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