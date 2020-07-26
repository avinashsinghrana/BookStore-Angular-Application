import {Component, OnInit} from '@angular/core';
import {WishlistService} from 'src/app/services/wishlist.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  books: any;
  private size: number;

  constructor(private wishService: WishlistService) {
  }

  ngOnInit(): any {
    this.getAllBookOfWL();
    this.printData();
    const sqnc = new Observable(this.books);

  }

  removeFromWishList(bookId: any) {
    this.wishService.removeFromWL(bookId, localStorage.getItem('token')).subscribe(data => {
      console.log(data);
      if (this.books.length > 0) {
        this.getAllBookOfWL();
      }
    });
  }

  addToCart(bookId: any) {
    this.wishService.addtoCartFromWL(bookId, localStorage.getItem('token')).subscribe(data => {
      console.log(data);
      this.getAllBookOfWL();
    });
  }

  public getAllBookOfWL() {
    this.wishService.getBookOfWishList(localStorage.getItem('token')).subscribe(response => {
      this.books = response.data;
      response.data.forEach((bookData) => {
        localStorage.setItem('w' + bookData.bookId, JSON.stringify(bookData));
        sessionStorage.setItem(bookData.bookId, bookData.bookId);
      });
    });
  }

  printData() {
    let num1: number = +sessionStorage.getItem('cartsize');
    let num2: number = +sessionStorage.getItem('size');
    this.size = num1 + num2;
    console.log('num1 ', num1);
    console.log('num2 ', num2);
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      console.log('key', key);
      console.log('key 0', key[0]);
      if (key[0] == 'w') {
        console.log('value', JSON.parse(localStorage.getItem(key)));
        this.books.push(JSON.parse(localStorage.getItem(key)));
      }
      // this.value[localStorage.getItem(key)] = sessionStorage.getItem(key);
    }
  }
}
