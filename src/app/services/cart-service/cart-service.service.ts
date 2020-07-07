import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
 

  constructor(private httpService: HttpService) { }

/* 
  getBookCart(){
    return this.httpService.GET('/user/getAllFromCart');
  }
*/
  addBooks(bookId){
    bookId=1;
    
    return this.httpService.foo('/user/addMoreItems?bookId=1');
  } 

  removeItem(bookId){
    bookId=1;
    
    return this.httpService.removeCart('/user/removeFromCart?bookId=1');
  }

  removeAllItems(){
    
    return this.httpService.removeAllItemsCart('/user/removeAllFromCart');
  }
}
