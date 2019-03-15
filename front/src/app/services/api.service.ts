///<reference path="../../../node_modules/@angular/http/src/http.d.ts"/>

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {AppSettings} from '../app.settings';
import {Data} from "../model/data";

@Injectable()

export class ApiService {

    constructor(private _http: Http) {}

    getData(param): Observable<Data[]> {

      const data = {
        'param' : param,
      };

      const body = JSON.stringify(data);

      const headers = new Headers({
        'Content-Type': 'application/json'
      });

        return this._http
            .get(
              AppSettings.API_ENDPOINT,
              {headers: headers}
              )
            .map((response: Response) => <Data> response.json())
            .do(res => console.log(res))
            .catch(this.handleError);

    }

    private handleError(error: Response) {
        console.error(error);
        const message = `Error status code ${error.status} at ${error.url}`;
        return Observable.throw(message);

    }
}
