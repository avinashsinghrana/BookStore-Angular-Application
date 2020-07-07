import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SellerService } from "./../services/seller.service";
import { UserService } from "./../services/user.service";
//import { BookService } from "./../services/book.service";

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSource = new BehaviorSubject(Response);
  private messageSources = new BehaviorSubject(Response);
  private eventSource = new Subject<string>();
  currentMessage = this.messageSource.asObservable();
  currentMessages = this.messageSources.asObservable();
  currentEvent$ = this.eventSource.asObservable();
  constructor(
    private vendorService: SellerService,
    private userService: UserService
  //  private bookService: BookService
  ) {}

  changeEvent(message: string){
    this.eventSource.next(message);
  }
  changeMessage() {
    this.vendorService.displayBooks().subscribe((data) => {
      this.messageSource.next(data);
    });
  }
  changeMessages() {
    this.vendorService.displayAllBooks().subscribe((data) => {
      this.messageSources.next(data);
    });
  }

  searchBook(event) {
   /* this.bookService.searchBooks(event.target.value).subscribe((data) => {
      this.messageSource.next(data);
    });*/
  }
}
