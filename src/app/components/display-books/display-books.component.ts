import { Component, OnInit } from '@angular/core';
import { SellerService } from "../../services/seller.service";
import { MessageService } from "../../services/message.service";
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-display-books',
  templateUrl: './display-books.component.html',
  styleUrls: ['./display-books.component.scss'],
})
export class DisplayBooksComponent implements OnInit {
  books = [];
  book: Book[];
  searchTerm: string;
  message: string;
  //sortTearm: string;
 // searchTerm = localStorage.getItem('searchTerm');
  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.messageService.currentMessage.subscribe((data) => {
      this.books = [];
      this.onDisplayBooks(data);
    });
    this.messageService.currentEvent$.subscribe(message =>
      { this.searchTerm = message});
  }
  onBookDetail(event) {
    event.stopPropagation();
  }
 
  onKey(event) {
    this.searchTerm = event;
   // this.messageService.searchBook(event);
  }
  onUpdateBookForm(book) {
    this.dialog.open(UpdateBookComponent, {
      width: '600px',
      data: book,
      panelClass: 'custom-modalbox',
    });
  }

  onDisplayBooks(data) {
    console.log(data);
    if (data.status === 200) {
      data.data.forEach((bookData) => {
        this.books.push(bookData);
      });
    }
  }

  onDeleteBook(bookId) {
    console.log(bookId);
    this.vendorService.deleteBooks(bookId).subscribe(
      (data) => {
          this.messageService.changeMessage();  
      },
      (error: any) => {
        this.snackBar.open("Book Deletion Failed", 'ok', { duration: 2000 });
      }
    );
  }
 
}
