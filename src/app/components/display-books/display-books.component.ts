import { Component, OnInit } from '@angular/core';
import { SellerService } from "../../services/seller.service";
import { MessageService } from "../../services/message.service";
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateBookComponent } from '../update-book/update-book.component';

@Component({
  selector: 'app-display-books',
  templateUrl: './display-books.component.html',
  styleUrls: ['./display-books.component.scss'],
})
export class DisplayBooksComponent implements OnInit {
  books = [];

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
  }
  onBookDetail(event) {
    event.stopPropagation();
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
     /* this.snackBar.open(data.message, 'ok', {
        duration: 2000,
      });*/
    }
  }

  onDeleteBook(bookId) {
    console.log(bookId);
    this.vendorService.deleteBooks(bookId).subscribe(
      (data) => {
        if (data.status === 200) {
          this.messageService.changeMessage();
          this.snackBar.open(data.message, 'ok', {
            duration: 2000,
          });
        }
      },
      (error: any) => {
        this.snackBar.open(error.error, 'ok', { duration: 2000 });
      }
    );
  }
  onApproval(bookId: any) {
    this.vendorService.onApprove(bookId).subscribe(
      (data) => {
        if (data.status === 200) {
          this.messageService.changeMessage();
          this.snackBar.open(data.message, 'ok', {
            duration: 2000,
          });
        }
      },
      (error) => {
        this.snackBar.open(error.message, 'ok', {
          duration: 2000,
        });
      }
    );
  }
}
