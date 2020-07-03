import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string;
  constructor(public http: HttpClient) { }
  apiBaseurl = environment.baseUrl;
  
  postUser(user, url) {
    var httpOptions = {
      headers: new HttpHeaders({  "Content-Type": "application/json"  })
    };
    // set header in your http request
    return this.http.post(this.apiBaseurl + url, user, httpOptions);
  }

  postUrl(url){
    var httpOptions = {
      headers: new HttpHeaders({  "Content-Type": "application/json" })
    };
    return this.http.post(this.apiBaseurl + url, httpOptions);
  }

  putUrl(url: any, data: any, token: any) {
    return this.http.put(this.apiBaseurl + url, data, token);
  }

  post(url: any, body: any, options: any): Observable<any> {
    return this.http.post(url, body, options);
  }

  get(url: any, options: any): Observable<any> {
    return this.http.get(url, options);
  }

  put(url: any, body: any, options: any): Observable<any> {
    return this.http.put(url, body, options);
  }
  delete(url: any, options: any): Observable<any> {
    return this.http.delete(url, options);
  }
}