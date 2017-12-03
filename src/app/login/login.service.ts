import { baseUrl } from './../../utils/api';
import { Injectable } from '@angular/core';

// use either one below
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { ILogin } from './login';

@Injectable()
export class LoginService {
  constructor(private _httpClient: HttpClient) {}

  postLogin(username: string, password: string): any {
    return this._httpClient
      .post(`${baseUrl}/login`, {
        username,
        password,
        headers: {
          Accept: 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        withCredentials: true
      })
      .do((res) => {
        console.log(res);
      })
      .catch(this.handleError);

    // return fetch(`${baseUrl}/login`, {
    //   credentials: 'include', //pass cookies, for authentication
    //   method: 'post',
    //   headers: {
    //     Accept: 'application/json, application/xml, text/plain, text/html, *.*',
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    //   },
    //   body: `username=${username}&password=${password}`,
    //   mode: 'cors'
    // });
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
}
