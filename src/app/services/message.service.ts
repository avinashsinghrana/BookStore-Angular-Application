import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SellerService } from "./../services/seller.service";
import { UserService } from "./../services/user.service";
import { BookserviceService } from './bookservice/bookservice.service';
//import { BookService } from "./../services/book.service";

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSource = new BehaviorSubject(Response);
  private messageSources = new BehaviorSubject(Response);
  private adminBooks = new BehaviorSubject(Response);
  private eventSource = new Subject<string>();
  private itemSource = new Subject<number>();
  currentMessage = this.messageSource.asObservable();
  currentMessages = this.messageSources.asObservable();
  currentBooks = this.adminBooks.asObservable();
  currentEvent$ = this.eventSource.asObservable();
  currentItem$ = this.itemSource.asObservable();
  constructor(
    private vendorService: SellerService,
  ) {}

  changeEvent(message: string){
    this.eventSource.next(message);
  }
  changeItem(message: number){
    this.itemSource.next(message);
  }
  changeMessage() {
    this.vendorService.displayBooks().subscribe((data) => {
      this.messageSource.next(data);
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
