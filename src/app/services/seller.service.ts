import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from './../services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
 
  private addBookApi = 'sellers/addBook';
  private updateBookApi = '/sellers/updateBook';
  private deleteBookApi = '/sellers/deleteBook';
  private disapprove = '/admin/bookUnVerification';
  private displayBookApi = '/sellers/getUnverifiedBooks';
  private uploadBookProfileApi = 'users/uploadImage';
  private approveBookApi = '/admin/bookVerification';
  private displayAllBookApi = '/admin/getBooksForVerification';
  private getBookApi = '/user/getAllVerifiedBooks';
  private newlyAddedBookApi = '/sellers/getNewlyAddedBooks';
  private disapprovedBookApi = '/sellers/getDisapprovedBooks';
  private approvedBookApi = '/sellers/getApprovedBooks';
  private sendApprovalApi = '/sellers//sendApprovalRequest'

  constructor(private http: HttpClient, private service: HttpService) {}
  addBook(body: any): Observable<any> {
    return this.service.postBook(body, environment.addBookPath);
  }
  /* addBook(book: any): Observable<any> {
    return this.http.post(environment.baseUrl + this.addBookApi, book, {
      headers: new HttpHeaders().set('token', localStorage.getItem('stoken')),
    });
  }*/

  sendApprovalRequest(bookId: any): Observable<any> {
    return this.http.put(
      environment.baseUrl + this.sendApprovalApi + '/' + bookId,
      '',
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
      }
    );
  }

  displayApprovedBooks(): Observable<any> {
    return this.http.get(environment.baseUrl + this.approvedBookApi, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }
  displayDisapprovedBooks(): Observable<any> {
    return this.http.get(environment.baseUrl + this.disapprovedBookApi, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }
  displayNewlyAddedBooks(): Observable<any> {
    return this.http.get(environment.baseUrl + this.newlyAddedBookApi, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }

  displayBooks(): Observable<any> {
    return this.http.get(environment.baseUrl + this.displayBookApi, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }
  getBooks(): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.get(environment.baseUrl + this.getBookApi, httpOptions);
  }
  displayAllBooks(): Observable<any> {
    return this.http.get(environment.baseUrl + this.displayAllBookApi, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }

  deleteBooks(bookId: any): Observable<any> {
    return this.http.delete(
      environment.baseUrl + this.deleteBookApi + '/' + bookId,
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
      }
    );
  }
  ondisapprove(bookId: any): Observable<any> {
    return this.http.put(
      environment.baseUrl + this.disapprove + '/' + bookId,
      '',
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
      }
    );
  }
  uploadBookImage(file: FormData, isProfile: string): Observable<any> {
    return this.http.post(
      environment.baseUrl + this.uploadBookProfileApi,
      file,
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
        params: new HttpParams().set('isProfile', isProfile),
      }
    );
  }
  updateBook(body: any, bookId: any): Observable<any> {
    return this.http.put(
      environment.baseUrl + this.updateBookApi + '/' + bookId,
      body,
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
      }
    );
  }
  onApprove(bookId: any): Observable<any> {
    return this.http.put(
      environment.baseUrl + this.approveBookApi + '/' + bookId,
      '',
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
      }
    );
  }
}
