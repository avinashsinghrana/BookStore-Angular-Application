import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SellerService } from "./../services/seller.service";
//import { BookService } from "./../services/book.service";

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSource = new BehaviorSubject(Response);
  currentMessage = this.messageSource.asObservable();
  constructor(
    private vendorService: SellerService,
  //  private bookService: BookService
  ) {}

  changeMessage() {
    this.vendorService.displayBooks().subscribe((data) => {
      this.messageSource.next(data);
    });
  }
  searchBook(event) {
   /* this.bookService.searchBooks(event.target.value).subscribe((data) => {
      this.messageSource.next(data);
    });*/
  }
}
