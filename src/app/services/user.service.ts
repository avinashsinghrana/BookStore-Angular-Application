import {Seller} from 'src/app/model/seller.model';
import {Injectable} from '@angular/core';
import {HttpService} from './../services/http.service';
import {environment} from './../../environments/environment';
import {Subject, Observable} from 'rxjs';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {BaseURLFile} from '../base_url_file';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private queryParam = new Subject<any>();

  constructor(private service: HttpService, private http: HttpClient) {
  }

  login(body: any) {
    return this.service.postUser(body, environment.loginPath);
  }

  register(body: any) {
    return this.service.postUser(body, environment.registrationPath);
  }

  verification(token: string) {
    return this.http.get(BaseURLFile.ACTIVE_SERVER + 'user/verify/' + token);
  }

  getAllBooks() {
    return this.service.http.get(BaseURLFile.ACTIVE_SERVER + 'user/getallBooks');
  }

  disApproveBooks(bookId) {
    return this.service.http.delete(
      BaseURLFile.ACTIVE_SERVER + 'sellers/DeleteBook?bookId=' + bookId,
      {headers: new HttpHeaders().set('token', localStorage.getItem('token'))}
    );
  }

  approveBooks(bookId: any) {
    return this.service.http.put(
      BaseURLFile.ACTIVE_SERVER + 'admin/bookVerification/' +
      bookId +
      '/' +
      localStorage.getItem('token'),
      {headers: new HttpHeaders().set('token', localStorage.getItem('token'))}
    );
  }

  forgotPassword(body: any) {
    return this.service.postUser(body, environment.forgotPasswordPath);
  }

  resetPassword(data: any, token: string) {
    return this.service.putUrl(environment.resetPasswordPath + token, data, '');
  }

  setQueryParam(message: any) {
    this.queryParam.next({id: message});
  }

  getAllSellers() {
    return this.http.get(BaseURLFile.ACTIVE_SERVER + 'sellers/getAllSellers');
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

  bookPic(body: any) {
    return this.service.uploadImg(environment.bookPicPath, body);
  }

  getAllSellerBooks(sellerId: any) {
    return this.http.get(
      BaseURLFile.ACTIVE_SERVER + 'admin/getBooksForVerification/' + sellerId,
      {headers: new HttpHeaders().set('token', localStorage.getItem('token'))}
    );
  }

  public uploadProfilePic(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(BaseURLFile.ACTIVE_SERVER + 'sellers/addImg', formData);
  }

  uploadProfie(file: FormData, isProfile) {
    console.log('IN USERSERVICE TO UPLOAD IMAGE:', file);
    return this.service.postUser(isProfile, environment.registrationPath);
  }
}
