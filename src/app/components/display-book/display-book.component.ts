import { Component, OnInit } from '@angular/core';
import { SellerService } from "../../services/seller.service";
import { MessageService } from "../../services/message.service";
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateBookComponent } from '../update-book/update-book.component';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.scss'],
})
export class DisplayBookComponent implements OnInit {
  books = [];

  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.messageService.currentMessages.subscribe((data) => {
      this.books = [];
      this.onDisplayBooks(data);
    });
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
  onDeleteBook(bookId) {
    console.log(bookId);
    this.vendorService.deleteBooks(bookId).subscribe(
      (data) => {
          this.messageService.changeMessages();  
      },
      (error: any) => {
        this.snackBar.open("Book Deletion Failed", 'ok', { duration: 2000 });
      }
    );
  }
  onApprovals(bookId: any) {
    this.vendorService.onApprove(bookId).subscribe(
      (data) => {
          this.messageService.changeMessages();
      },
      (error) => {
        this.snackBar.open("Book Verification Failed", 'ok', {
          duration: 2000,
        });
      }
    );
  }
}
