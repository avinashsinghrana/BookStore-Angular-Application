import {Component, OnInit} from '@angular/core';
import {WishlistService} from 'src/app/services/wishlist.service';
import {Observable} from 'rxjs';
import {MessageService} from '../../services/message.service';
import {CartserviceService} from '../../services/cartservice.service';
import {UserBooksComponent} from '../user-books/user-books.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  books: any = [];
  size: number;
  num = 0;

  constructor(private wishService: WishlistService,
              private data: MessageService,
  ) {
  }

  ngOnInit(): any {
    if (localStorage.getItem('token') !== null && localStorage.getItem('roleType') === 'USER') {
      this.getAllBookOfWL();
    }
    if (+localStorage.getItem('size') > 0) {
      this.num = +localStorage.getItem('size');
    } else {
      this.num = 0;
    }

    if (+localStorage.getItem('fwsize') > 0) {
      this.size = +localStorage.getItem('fwsize');
    } else {
      this.size = 0;
    }
  }

  onAddBook(book) {
    this.num++;
    localStorage.setItem('size', JSON.stringify(this.num));
    this.data.changeItem(this.num);
    // sessionStorage.setItem(book.bookId, book.bookId);
    // this.value[book.bookId] = book.bookId;
    const cartBook = {
      bookId: book.bookId,
      name: book.bookName,
      author: book.authorName,
      imgUrl: book.bookImgUrl,
      maxQuantity: book.quantity,
      quantity: 1,
      totalPrice: book.price
    };
    localStorage.setItem('c' + book.bookId, JSON.stringify(cartBook));
  }

  removeFromWishList(bookId: any) {
    this.size--;
    localStorage.setItem('fwsize', JSON.stringify(this.size));
    this.data.changeWishItem(this.size);
    localStorage.removeItem('x' + bookId);
    this.wishService.removeFromWL(bookId, localStorage.getItem('token')).subscribe((response: any) => {
      this.getAllBookOfWL();
    });
  }

  addToCart(book: any) {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key === 'x' + book.bookId) {
        if (this.check('c', book) === 400) {
          this.onAddBook(book);
        }
      }
    }
    // this.cartserviceService.addToBag()
    this.removeFromWishList(book.bookId);
    this.data.changeWishObject(book);
  }

  check(char: any, book: any): any {
    let status: number = 400;
    if (char === 'c') {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key === 'c' + book.bookId) {
          status = 200;
        }
      }
    }
    if (char === 'x') {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key == 'x' + book.bookId) {
          status = 200;
        }
      }
    }
    return status;
  }

  public getAllBookOfWL() {
    this.wishService.getBookOfWishList(localStorage.getItem('token')).subscribe(response => {
      this.books = response.data;
      this.data.changeWishItem(response.data.length);
      this.data.changeWishObject(response.data);
      localStorage.setItem('fwsize', JSON.stringify(response.data.length));
    });
  }

  falsecall() {}
}
