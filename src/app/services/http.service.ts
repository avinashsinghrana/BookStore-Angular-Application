import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../environments/environment";
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
}
