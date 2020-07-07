import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SellerService } from "./../services/seller.service";
import { UserService } from "./../services/user.service";
//import { BookService } from "./../services/book.service";

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSource = new BehaviorSubject(Response);
  private messageSources = new BehaviorSubject(Response);
  currentMessage = this.messageSource.asObservable();
  currentMessages = this.messageSources.asObservable();
  constructor(
    private vendorService: SellerService,
    private userService: UserService
  //  private bookService: BookService
  ) {}

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
