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
      let key = sessionStorage.key(i);
      if (key[0] === 'c') {
        this.value[sessionStorage.getItem(key)] = sessionStorage.getItem(key);
      }
    }
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      if (key[0] === 'w') {
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
  page: number = 1;
  num: number = 0;
  wishnum = 0;
  wishToCart: any;


  ngOnInit() {
    this.messageService.currentWishBooks$.subscribe( (reply) => {
      console.log('wish book to cart', reply);
      this.wishBooks = reply;
      console.log('wish value in user book' , this.wishvalue);
      //  this.onAddBook(reply);
    });
    this.sortTerm = 'none';
    this.messageService.changeItem(this.item);
    this.messageService.changeWishItem(this.wishnum);
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

  onWish(book: any){
    if (localStorage.getItem('token') !== null && localStorage.getItem('roleType') === 'USER') {
      this.wishnum++;
      sessionStorage.setItem('fwsize', JSON.stringify(this.wishnum));
      this.messageService.changeWishItem(this.wishnum);
      this.wishlistService.addToWishList(book.bookId, localStorage.getItem('token')).subscribe(
        response => {
          this.wishBooks = response.data;
          console.log('wish addition' + JSON.stringify(response));
        });
      sessionStorage.setItem('w' + book.bookId, book.bookId);
      this.wishvalue['w'+ book.bookId] = book.bookId;
      // var wishBook = {
      //   bookId: book.bookId,
      //   bookName: book.bookName,
      //   authorName: book.authorName,
      //   bookImgUrl: book.bookImgUrl,
      //   price: book.price
      // };
      // localStorage.setItem('w' + book.bookId, JSON.stringify(wishBook));

    }else {
      this.snackBar.open('Please Login First', 'Ok', {duration: 2000});
      return;
    }
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
    sessionStorage.setItem('size', JSON.stringify(this.num));
    this.messageService.changeItem(this.num);
    sessionStorage.setItem('c'+book.bookId, book.bookId);
    this.value['c'+ book.bookId] = book.bookId;
    var cartBook = {
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
  wishCheck(bookId: any): any{
    let id = -1;
    for (let i = 0 ; i < this.wishBooks.length ; i++){
      if (this.wishBooks[i] === bookId) {
        id = bookId;
      }
    }
    return id;
  }
}
