import { Injectable } from '@angular/core';
import { HttpService } from './../services/http.service';
import { environment } from './../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private queryParam = new Subject<any>();

  constructor(private service: HttpService, private http: HttpClient) {}

  login(body: any) {
    return this.service.postUser(body, environment.loginPath);
  }
  register(body: any) {
    return this.service.postUser(body, environment.registrationPath);
  }

  getAllBooks() {
    return this.service.http.get('http://localhost:8081/user/getallBooks');
  }

  disApproveBooks(bookId) {
    return this.service.http.delete(
      'http://localhost:8081/sellers/DeleteBook?bookId=' + bookId,
      { headers: new HttpHeaders().set('token', localStorage.getItem('token')) }
    );
  }

  approveBooks(bookId: any) {
    return this.service.http.put(
      'http://localhost:8081/admin/bookVerification/' +
        bookId +
        '/' +
        localStorage.getItem('token'),
      { headers: new HttpHeaders().set('token', localStorage.getItem('token')) }
    );
  }

  forgotPassword(body: any) {
    return this.service.postUser(body, environment.forgotPasswordPath);
  }
  resetPassword(data: any, token: string) {
    return this.service.putUrl(environment.resetPasswordPath + token, data, '');
  }
  setQueryParam(message: any) {
    this.queryParam.next({ id: message });
  }

  getAllSellers() {
    return this.http.get('http://localhost:8081/sellers/getAllSellers');
  }
  getQueryParam(): Observable<any> {
    return this.queryParam.asObservable();
  }
  /*profilePic(body: any) {
    return this.service.upload(environment.addimg, body);
  }*/
  profilePic(body: any) {
    return this.service.upload(environment.profilePicPath, body);
  }

  public uploadProfilePic(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:8081/sellers/addImg', formData);
  }

  uploadProfie(file: FormData, isProfile) {
    console.log('IN USERSERVICE TO UPLOAD IMAGE:', file);
    return this.service.postUser(isProfile, environment.registrationPath);
    //return this.http.POST('users/uploadImage',file,{ headers: new HttpHeaders().set('token', localStorage.getItem('token')),params: new HttpParams().set('isProfile', isProfile) });
  }
}
