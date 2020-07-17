import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SellerService } from "./../services/seller.service";
import { UserService } from "./../services/user.service";
import { BookserviceService } from './bookservice/bookservice.service';
import { CartServiceService } from './cart-service/cart-service.service';
//import { BookService } from "./../services/book.service";

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageOnNewlyAdded = new BehaviorSubject(Response);
  private messageOnDisapproved = new BehaviorSubject(Response);
  private messageOnApproved = new BehaviorSubject(Response);
  private messageSources = new BehaviorSubject(Response);
  private cartBookSource = new BehaviorSubject(Response);
  private adminBooks = new BehaviorSubject(Response);
  private eventSource = new Subject<string>();
  private itemSource = new Subject<number>();
  private cartSource = new Subject<any>();
  currentNewlyAdded = this.messageOnNewlyAdded.asObservable();
  currentDisapproved = this.messageOnDisapproved.asObservable();
  currentApproved = this.messageOnApproved.asObservable();
  currentMessages = this.messageSources.asObservable();
  currentBooks = this.adminBooks.asObservable();
  currentEvent$ = this.eventSource.asObservable();
  currentItem$ = this.itemSource.asObservable();
  currentCart$ = this.cartSource.asObservable();
  currentBooksInCart = this.cartBookSource.asObservable();
  constructor(
    private vendorService: SellerService,
    private cartService: CartServiceService
  ) {}

  changeCartBook(){
    this.cartService.getBookCart().subscribe((data) => {
       this.cartBookSource.next(data);
       console.log("get ",data);
    });
  }

  changeEvent(message: string){
    this.eventSource.next(message);
  }
  changeItem(message: number){
    this.itemSource.next(message);
  }
  changeCart(message: any){
    this.cartSource.next(message);
  }
  changeOnNewlyAdded() {
    this.vendorService.displayNewlyAddedBooks().subscribe((data) => {
      this.messageOnNewlyAdded.next(data);
    });
  }
  changeOnDisapproved() {
    this.vendorService.displayDisapprovedBooks().subscribe((data) => {
      this.messageOnDisapproved.next(data);
    });
  }
  changeOnApproved() {
    this.vendorService.displayApprovedBooks().subscribe((data) => {
      this.messageOnApproved.next(data);
    });
  }
  changeMessages() {
    this.vendorService.getBooks().subscribe((data) => {
      this.messageSources.next(data);
    });
  }
  changeBooks() {
    this.vendorService.displayAllBooks().subscribe((data) => {
      this.adminBooks.next(data);
    });
  }
  searchBook(event) {
   /* this.bookService.searchBooks(event.target.value).subscribe((data) => {
      this.messageSource.next(data);
    });*/
  }
}
