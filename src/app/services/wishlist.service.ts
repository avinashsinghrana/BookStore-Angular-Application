import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpService: HttpService) {
  }

  addToWishList(bookId: any, token: string): any {
    return this.httpService.addedToWishList('http://localhost:8081/user/addToWishlist?bookId=' + bookId + '&token=' + token);
  }

  getBookOfWishList(token: string): any {
    return this.httpService.getWishlistBooks('http://localhost:8081/user/getWishListBooks?token=' + token);
  }

  removeFromWL(bookId: any, token: string) {
    return this.httpService.removeFromWishList('http://localhost:8081/user/deleteFromWishlist?bookId=' + bookId + '&token=' + token);
  }

  addtoCartFromWL(bookId: any, token: string) {
    return this.httpService.addToCartFromWishList('http://localhost:8081/user/addFromWishlistToCart?bookId=' + bookId + '&token=' + token);
  }

  getIdFromWishList() {
    return this.httpService.getIdFromWL('http://localhost:8081/user/wishListStatus?token=' + localStorage.getItem('token'));
  }
}
