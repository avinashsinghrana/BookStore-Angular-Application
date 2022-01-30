import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {BaseURLFile} from '../base_url_file';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpService: HttpService) {
  }

  addToWishList(bookId: any, token: string): any {
    return this.httpService.addedToWishList(BaseURLFile.ACTIVE_SERVER + 'user/addToWishlist?bookId=' + bookId + '&token=' + token);
  }

  getBookOfWishList(token: string): any {
    return this.httpService.getWishlistBooks(BaseURLFile.ACTIVE_SERVER + 'user/getWishListBooks?token=' + token);
  }

  removeFromWL(bookId: any, token: string) {
    return this.httpService.removeFromWishList(BaseURLFile.ACTIVE_SERVER + 'user/deleteFromWishlist?bookId=' + bookId + '&token=' + token);
  }

  addtoCartFromWL(bookId: any, token: string) {
    return this.httpService.addToCartFromWishList(BaseURLFile.ACTIVE_SERVER + 'user/addFromWishlistToCart?bookId=' + bookId + '&token=' + token);
  }

  getIdFromWishList() {
    return this.httpService.getIdFromWL(BaseURLFile.ACTIVE_SERVER + 'user/wishListStatus?token=' + localStorage.getItem('token'));
  }
}
