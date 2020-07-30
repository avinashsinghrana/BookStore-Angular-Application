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
    this.data.changeWishItem(this.size);
    if (localStorage.getItem('token') !== null && localStorage.getItem('roleType') === 'USER') {
      this.getAllBookOfWL();

    }
    // this.printData();
    const sqnc = new Observable(this.books);
  }

  removeFromWishList(bookId: any) {
    // localStorage.removeItem('w' + bookId);
    // sessionStorage.removeItem('w' + bookId);
    // let num1: number = +sessionStorage.getItem('fwsize');
    // let num2: number = +sessionStorage.getItem('bwsize');
    // let size1: number = num1;
    // size1--;
    // if (size1 >= 0) {
    //   sessionStorage.setItem('fwsize', JSON.stringify(size1));
    // }
    // this.data.currentWishItem$.subscribe(data => {
    //   this.size = data;
    // });
    this.size = +localStorage.getItem('fwsize');
    this.size--;
    localStorage.setItem('fwsize', JSON.stringify(this.size));
    this.data.changeWishItem(this.size);
    localStorage.removeItem('x' + bookId);
    this.wishService.removeFromWL(bookId, localStorage.getItem('token')).subscribe((response: any) => {
        this.getAllBookOfWL();
    });
    // this.books = [];
    // this.printData();
  }

  addToCart(book: any) {
     this.removeFromWishList(book.bookId);
     this.data.changeWishObject(book);
  }

  public getAllBookOfWL() {
    this.wishService.getBookOfWishList(localStorage.getItem('token')).subscribe(response => {
      this.books = response.data;
      this.data.changeWishItem(response.data.length);
      this.data.changeWishObject(response.data);
      // response.data.forEach((bookData) => {
      //   localStorage.setItem('w' + bookData.bookId, JSON.stringify(bookData));
      //   sessionStorage.setItem('w' + bookData.bookId, bookData.bookId);
      // });
    });
  }

  // printData() {
  //   for (let i = 0; i < localStorage.length; i++) {
  //     let key = localStorage.key(i);
  //     if (key[0] == 'w') {
  //       this.books.push((JSON.parse(localStorage.getItem(key))));
  //     }
  //   }
  // }
}
