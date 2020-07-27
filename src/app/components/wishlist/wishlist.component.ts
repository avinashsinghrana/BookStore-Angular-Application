import {Component, OnInit} from '@angular/core';
import {WishlistService} from 'src/app/services/wishlist.service';
import {Observable} from 'rxjs';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  books: any = [];
  private size: number;

  constructor(private wishService: WishlistService,
              private data: MessageService) {
  }

  ngOnInit(): any {
    if (localStorage.getItem('token') !== null) {
      this.getAllBookOfWL();

    }
    this.printData();
    const sqnc = new Observable(this.books);

  }

  removeFromWishList(bookId: any) {
    // this.wishService.removeFromWL(bookId, localStorage.getItem('token')).subscribe(data => {
    //   console.log(data);
    //   if (this.books.length > 0) {
    //     // this.getAllBookOfWL();
    //   }
    // });

    console.log('ccc', bookId);
    localStorage.removeItem('w' + bookId);
    sessionStorage.removeItem('w' + bookId);
    let num1: number = +sessionStorage.getItem('wishsize');
    let num2: number = +sessionStorage.getItem('wishsize2');
    let size1: number = num1;
    size1--;
    if (size1 >= 0) {
      sessionStorage.setItem('wishsize', JSON.stringify(size1));
    }
    this.data.changeWishItem(size1);
    // location.reload();
    if (localStorage.getItem('token') != null && num1 !== 0) {
      this.wishService.removeFromWL(bookId, localStorage.getItem('token')).subscribe((response: any) => {
        this.getAllBookOfWL();
        location.reload();
        // num1--;
        // sessionStorage.setItem('cartsize',JSON.stringify(num1));
        // this.books = [];
        // this.printData();
        /* sessionStorage.removeItem(bookId);
         let size: any =  sessionStorage.getItem('size');
         size--;
         if(size>=0){
         sessionStorage.setItem('size', size);
         }
          console.log("Book id",bookId);
          console.log("response", response);*/

      });
      // this.messageService.changeCartBook();
    }
    this.books = [];
    this.printData();
  }

  addToCart(book: any) {
    // localStorage.setItem('c' + book.bookId, JSON.stringify(book));
    // this.data.changeWishObject(book);
    // console.log(localStorage.getItem('c' + book.bookId));
    // this.removeFromWishList(book.bookId);

    // localStorage.setItem('duplicate', JSON.stringify(book));
    // this.data.changeWishObject(book);
    // this.removeFromWishList(book.bookId);
  }

  public getAllBookOfWL() {
    this.wishService.getBookOfWishList(localStorage.getItem('token')).subscribe(response => {
      this.books = response.data;
      sessionStorage.setItem('wishsize2', response.data.length);
      this.data.changeWishItem(response.data.length);
      response.data.forEach((bookData) => {
        localStorage.setItem('w' + bookData.bookId, JSON.stringify(bookData));
        sessionStorage.setItem('w' + bookData.bookId, bookData.bookId);
      });
    });
  }

  printData() {
    let num1: number = +sessionStorage.getItem('cartsize');
    let num2: number = +sessionStorage.getItem('size');
    this.size = num1 + num2;
    console.log('num1 ', num1);
    console.log('num2 ', num2);
    let k = 0;
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      console.log('key', key);
      console.log('key 0', key[0]);
      if (key[0] == 'w') {
        console.log('value', JSON.parse(localStorage.getItem(key)));
        this.books.push((JSON.parse(localStorage.getItem(key))));
        console.log("after push", this.books);
        k++;
      }
      // this.value[localStorage.getItem(key)] = sessionStorage.getItem(key);
    }
  }
}
