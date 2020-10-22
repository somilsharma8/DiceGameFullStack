import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:8000/';
  }

  get(uri: string) {
    return this.http.request('get', `${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {

    return new Promise((resolve, reject) => {
      const token = 'somilauth123'

      this.http.post(this.ROOT_URL + uri, payload).subscribe(data => {
        console.log('app-http service response' + data);
        resolve(data);
      });
    }); 

    /*return this.http.request('post', `${this.ROOT_URL}/${uri}`, {
      body: payload,
      responseType: 'json',
      observe: 'body',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });*/

  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

}
