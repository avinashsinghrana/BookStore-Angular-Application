import {Component, OnInit, ViewChildren} from '@angular/core';
import {SellerService} from '../../services/seller.service';
import {MessageService} from '../../services/message.service';
import {MatSnackBar, MatDialog} from '@angular/material';
import {UpdateBookComponent} from '../update-book/update-book.component';
import {Book} from 'src/app/models/book.model';
import {CartServiceService} from 'src/app/services/cart-service/cart-service.service';
import {CartserviceService} from 'src/app/services/cartservice.service';
import {WishlistService} from '../../services/wishlist.service';
import {filter} from 'rxjs/operators';
import {LoginComponent} from '../login/login.component';
import {localizedString} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss'],
})
export class UserBooksComponent implements OnInit {

  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private cartService: CartServiceService,
    private cartServices: CartserviceService,
    private dialog: MatDialog,
    private wishlistService: WishlistService
  ) {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      // if (key[0] === 'c') {
      this.value[sessionStorage.getItem(key)] = sessionStorage.getItem(key);
      // }
    }
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key[0] === 'x') {
        this.wishvalue[sessionStorage.getItem(key)] = sessionStorage.getItem(key);
      }
    }
  }

  books = [];
  book: Book[];
  wishBooks: any = [];
  searchTerm: string;
  message: string;
  size: any;
  sortTerm: string;
  item: any;
  add: false;
  isAdded: boolean;
  value: any = [];
  toggle = true;
  wishvalue: any = [];
  // wishvalue: any;
  page = 1;
  num = 0;
  wishnum = 0;
  wishToCart: any = [];


  ngOnInit() {
    this.messageService.currentWishBooks$.subscribe((reply) => {
      this.wishBooks = reply;
      if (+localStorage.getItem('fwsize') > 0) {
        this.wishnum = +localStorage.getItem('fwsize');
        this.messageService.changeWishItem(this.wishnum);
      } else {
        this.wishnum = 0;
        this.messageService.changeWishItem(this.wishnum);
      }
    });
    this.messageService.currentItem$.subscribe(reply => {
      if (+localStorage.getItem('size') > 0) {
        this.num = +localStorage.getItem('size');
        this.messageService.changeItem(this.num);
      } else {
        this.num = 0;
        this.messageService.changeItem(this.num);
      }
    });
    this.messageService.currentWishToCart$.subscribe(response => {
      this.wishToCart = response;
      this.onAddBook(this.wishToCart);
      this.wishToCart = [];
      this.messageService.changeWishItem(this.wishToCart);
    });

    this.sortTerm = 'none';
    this.messageService.changeItem(this.item);
    this.messageService.currentMessages.subscribe((data) => {
      this.books = [];
      this.onDisplayBooks(data);
    });
    this.messageService.currentEvent$.subscribe(message => {
      this.searchTerm = message;

    });
  }

  onBookDetail(event) {
    event.stopPropagation();
  }

  onKey(event) {
    this.searchTerm = event;
  }

  onSelect(val: any) {
    this.sortTerm = val;
    console.log('sorting term', this.sortTerm);
  }

  onWish(book: any) {
    if (localStorage.getItem('token') !== null && localStorage.getItem('roleType') === 'USER') {
        this.wishnum++;
        localStorage.setItem('fwsize', JSON.stringify(this.wishnum));
        this.messageService.changeWishItem(this.wishnum);
        this.wishlistService.addToWishList(book.bookId, localStorage.getItem('token')).subscribe(
          response => {
            this.wishBooks = response.data;
            console.log('wish addition' + JSON.stringify(response));
          });
        localStorage.setItem('x' + book.bookId, book.bookId);
        this.wishvalue['x' + book.bookId] = book.bookId;
        this.messageService.changeWishItem(this.wishnum);
        this.snackBar.open('Added to wishList', 'ok', {duration : 2000});
      // this.snackBar.open('Already in cart', 'ok', {duration : 2000});

      // var wishBook = {
      //   bookId: book.bookId,
      //   bookName: book.bookName,
      //   authorName: book.authorName,
      //   bookImgUrl: book.bookImgUrl,
      //   price: book.price
      // };
      // localStorage.setItem('w' + book.bookId, JSON.stringify(wishBook));

    } else {
      this.signin();
      return;
    }
  }

  signin() {
    this.dialog.open(LoginComponent, {
      width: '28%',
      height: 'auto'
    });
  }

  onDisplayBooks(data) {
    console.log(data);
    if (data.status === 200) {
      this.size = data.data.length;
      data.data.forEach((bookData) => {
        this.books.push(bookData);

      });
    }
  }

  onAddBook(book) {
    this.num++;
    localStorage.setItem('size', JSON.stringify(this.num));
    this.messageService.changeItem(this.num);
    sessionStorage.setItem(book.bookId, book.bookId);
    this.value[book.bookId] = book.bookId;
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
    if (this.wishCheck(book.bookId) === book.bookId){
        this.removeFromWishList(book.bookId);
    }
  }
  removeFromWishList(bookId: any) {
    this.wishnum--;
    localStorage.setItem('fwsize', JSON.stringify(this.wishnum));
    this.messageService.changeWishItem(this.wishnum);
    localStorage.removeItem('x' + bookId);
    this.wishlistService.removeFromWL(bookId, localStorage.getItem('token')).subscribe((response: any) => {
    });
  }
  wishCheck(bookId: any): any {
    let id = -1;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'x' + bookId) {
        id = bookId;
      }
    }
    return id;
  }
  cartCheck(bookId: any): any {
    let id = -1;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'c' + bookId) {
        id = bookId;
      }
    }
    return id;
  }
}
