import { Injectable } from '@angular/core';
import { HttpService } from "./../services/http.service";
import { environment } from "./../../environments/environment";
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private queryParam = new Subject<any>();

  constructor(private service: HttpService) { }

  login(body: any) {
    return this.service.postUser(body, environment.loginPath);
  }
  register(body: any) {
    return this.service.postUser(body, environment.registrationPath);
  }

  getAllUnverifiedBooks(token: string) {
    return this.service.http.get('http://localhost:8080/admin/getBooksForVerification/'+token);
  }
  forgotPassword(body: any){
    return this.service.postUser(body, environment.forgotPasswordPath);
  }
  resetPassword(data: any, token: string) {
    return this.service.putUrl(environment.resetPasswordPath + token, data, '');
  }
  setQueryParam(message: any) {
    this.queryParam.next({ id: message });
  }

  getQueryParam(): Observable<any> {
    return this.queryParam.asObservable();
  }
  profilePic(body: any) {
    return this.service.upload(environment.profilePicPath, body);
  }

  uploadProfie(file:FormData,isProfile)
  {
    console.log("IN USERSERVICE TO UPLOAD IMAGE:",file);
    return   this.service.postUser(isProfile, environment.registrationPath);;
    //return this.http.POST('users/uploadImage',file,{ headers: new HttpHeaders().set('token', localStorage.getItem('token')),params: new HttpParams().set('isProfile', isProfile) });
  }
}

