import { Component, OnInit } from '@angular/core';
import { SellerService } from "../../services/seller.service";
import { MessageService } from "../../services/message.service";
import { MatSnackBar, MatDialog } from '@angular/material';
import { CartServiceService } from 'src/app/services/cart-service/cart-service.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.scss'],
})
export class DisplayBookComponent implements OnInit {
  books = [];
  book: Book[];
  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cartService: CartServiceService
  ) {}

  ngOnInit() {
    this.messageService.currentMessages.subscribe((data) => {
      this.books = [];
      this.onDisplayBooks(data);
    });
  /*  this.vendorService.getBooks().subscribe((data) => {
      this.books = [];
      this.onDisplayBooks(data);
    });*/
   // console.log(this.books);
  }
  onBookDetail(event) {
    event.stopPropagation();
  }
 
  onDisplayBooks(data) {
    console.log(data);
    if (data.status === 200) {
      data.data.forEach((bookData) => {
        this.books.push(bookData);
      });
    }
  }
  onAdd(bookId) {
    console.log(bookId);
    this.cartService.addBooks(bookId).subscribe(
      (data) => {
          this.messageService.changeMessages();  
      },
      (error: any) => {
        this.snackBar.open("Book Added to cart Failed", 'ok', { duration: 2000 });
      }
    );
  }
  onWish(bookId) {
  }
}
