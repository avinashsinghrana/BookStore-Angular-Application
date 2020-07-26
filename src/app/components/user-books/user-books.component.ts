import {Component, OnInit} from '@angular/core';
import {SellerService} from '../../services/seller.service';
import {MessageService} from '../../services/message.service';
import {MatSnackBar, MatDialog} from '@angular/material';
import {UpdateBookComponent} from '../update-book/update-book.component';
import {Book} from 'src/app/models/book.model';
import {CartServiceService} from 'src/app/services/cart-service/cart-service.service';
import {CartserviceService} from 'src/app/services/cartservice.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss'],
})
export class UserBooksComponent implements OnInit {
  books = [];
  book: Book[];
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
  page: number = 1;
  num: number = 0;
  wishnum: number = 0;

  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private cartService: CartServiceService,
    private cartServices: CartserviceService,
    private data: MessageService,
    private dialog: MatDialog
  ) {
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      this.value[sessionStorage.getItem(key)] = sessionStorage.getItem(key);
    }
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      this.wishvalue[sessionStorage.getItem(key)] = sessionStorage.getItem(key);
    }
  }

  ngOnInit() {
    this.sortTerm = 'none';
    // this.item = sessionStorage.getItem('size');
    this.data.changeItem(1);
    this.messageService.currentMessages.subscribe((data) => {
      this.books = [];
      this.onDisplayBooks(data);
    });
    this.messageService.currentEvent$.subscribe(message => {
      this.searchTerm = message;
    });
    this.printData();
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
    // this.messageService.changeCart(book);
    console.log('seema', book);
    // this.wishValue[book.bookId] = book.bookId;
    this.wishnum++;
    sessionStorage.setItem('wishsize', JSON.stringify(this.wishnum));
    this.data.changeWishItem(this.wishnum);
    sessionStorage.setItem(book.bookId, book.bookId);
    this.wishvalue[book.bookId] = book.bookId;
    // tslint:disable-next-line:prefer-const
    var wishBook = {
      bookId: book.bookId,
      bookName: book.bookName,
      authorName: book.authorName,
      bookImgUrl: book.bookImgUrl,
      price: book.price
    };
    localStorage.setItem('w' + book.bookId, JSON.stringify(wishBook));
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
    // this.messageService.changeCart(book);
    console.log('seema', book);
    this.num++;
    sessionStorage.setItem('size', JSON.stringify(this.num));
    this.data.changeItem(this.num);
    sessionStorage.setItem(book.bookId, book.bookId);
    this.value[book.bookId] = book.bookId;
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
    /*  this.cartServices.addToBag(book.bookId).subscribe((message) => {
        console.log(message);
        sessionStorage.setItem(book.bookId, book.bookId);
        this.value[book.bookId] = book.bookId;
        this.data.changeItem(message.size);
        sessionStorage.setItem('size', message.size);
        this.snackBar.open("Book Added to Bag SuccessFully", "OK", {
          duration: 4000,
        });
      });*/
  }

}
