import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from './../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  url: string;

  constructor(public http: HttpClient) {
  }

  apiBaseurl = environment.baseUrl;

  postUser(user, url) {
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    // set header in your http request
    return this.http.post(this.apiBaseurl + url, user, httpOptions);
  }

  postUrl(url) {
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.apiBaseurl + url, httpOptions);
  }

  putUrl(url: any, data: any, token: any) {
    return this.http.put(this.apiBaseurl + url, data, token);
  }

  post(url: any, body: any, options: any): Observable<any> {
    return this.http.post(url, body, options);
  }

  addtoCart(url: any): Observable<any> {
    return this.http.post(url, Option);
  }

  geet(url: any): Observable<any> {
    return this.http.get(url);
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

  postBook(newBook, url) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      })
    };
    // set header in your http request
    return this.http.post(this.apiBaseurl + url, newBook, httpOptions);
  }

  upload(url: string, body: any): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        token: localStorage.getItem('token')
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  uploadImg(url: string, body: any): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({})
    };
    return this.http.post(url, body, httpOptions);
  }

  public POST(url: any, data: any, token: any): any {
    return this.http.post(this.apiBaseurl + url, data, token);
  }

  public foo(url: any) {
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.apiBaseurl + url, httpOptions);
  }

  public removeCart(url: any) {

    return this.http.delete(this.apiBaseurl + url);

  }

  public removeAllItemsCart(url: any) {

    return this.http.delete(this.apiBaseurl + url, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });

  }

  public getBooksCart(url: any) {
    return this.http.get(url, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }

  public getOrderId(url: any) {
    return this.http.get(url);
  }

  clearCart(url: any) {
    return this.http.delete(url, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }

  addItem(url) {
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    // set header in your http request
    return this.http.post(this.apiBaseurl + url, httpOptions);
  }

  addedToWishList(url: any) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(url, httpOptions);
  }

  getWishlistBooks(url: string) {
    return this.http.get(url);
  }

  removeFromWishList(url: string) {
    return this.http.delete(url);
  }

  addToCartFromWishList(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(url, httpOptions);
  }

  getIdFromWL(url: string) {
    return this.http.get(url);
  }

  mailSend(url: string) {
    return this.http.post(url, '');
  }

  getDetails(url: string) {
    return this.http.get(url);
  }

}
