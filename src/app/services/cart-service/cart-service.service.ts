import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Observable} from 'rxjs';
import {BaseURLFile} from '../../base_url_file';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private httpService: HttpService) {
  }


  /* getBookCart(): Observable<any> {
     return this.httpService.getBooksCart('http://localhost:8081/user/getAllFromCart');
   }*/
  getBookCart(): Observable<any> {
    return this.httpService.getBooksCart(BaseURLFile.ACTIVE_SERVER + 'user/getAllFromCart');
  }

  addBooks(bookId) {
    return this.httpService.foo('/user/addMoreItems?bookId=' + bookId);
  }

  removeItem(bookId) {
    return this.httpService.removeCart('/user/removeFromCart?bookId=' + bookId);
  }

  removeBookById(book_id) {
    return this.httpService.removeAllItemsCart('/user/removeAllFromCart/' + book_id);
  }

  addIteams(book_id, quantity) {
    return this.httpService.addItem('/user/addItems/' + book_id + '/' + quantity);
  }

  removeAll() {
    return this.httpService.clearCart(BaseURLFile.ACTIVE_SERVER + 'user/removeAll');
  }

  sendMail() {
    return this.httpService.mailSend(BaseURLFile.ACTIVE_SERVER + 'user/orderPlacedMail/' + localStorage.getItem('token'));
  }
}
