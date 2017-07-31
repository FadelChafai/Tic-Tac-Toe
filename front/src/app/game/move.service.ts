///<reference path="../../../node_modules/@angular/http/src/http.d.ts"/>

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {IMove} from './move';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {AppSettings} from '../app.settings';

@Injectable()

export class MoveService {

    constructor(private _http: Http) {}

    getNextMove(board, unit): Observable<IMove> {

      const data = {
        'board' : board,
        'unit'  : unit
      };

      const body = JSON.stringify(data);

      const headers = new Headers({
        'Content-Type': 'application/json'
      });

        return this._http
            .post(
              AppSettings.API_ENDPOINT,
              body,
              {headers: headers}
              )
            .map((response: Response) => <IMove> response.json())
            .do(res => console.log(res))
            .catch(this.handleError);

    }

    private handleError(error: Response) {
        console.error(error);
        const message = `Error status code ${error.status} at ${error.url}`;
        return Observable.throw(message);

    }
}
