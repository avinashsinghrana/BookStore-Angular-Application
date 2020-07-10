import { Component, OnInit } from '@angular/core';
import { SellerService } from "../../services/seller.service";
import { MessageService } from "../../services/message.service";
import { MatSnackBar, MatDialog } from '@angular/material';
import { Book } from 'src/app/models/book.model';


@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.scss'],
})
export class AdminBooksComponent implements OnInit {
  books = [];
  book: Book[];
  searchTerm: string;
  message: string;
  size: any;
  sortTerm: string;
  item: any;
  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private data: MessageService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
   
   // this.sortTerm = 'none';
    this.messageService.currentBooks.subscribe((data) => {
      this.books = [];
      this.onDisplayBooks(data);
    });
    this.messageService.currentEvent$.subscribe(message =>
      { this.searchTerm = message});
  }
  onBookDetail(event) {
    event.stopPropagation();
  }
/*
  onSelect(val: any){
   this.sortTerm = val;
   console.log("sorting term",this.sortTerm);
  }*/
  onApproval(bookId: any) {
    this.vendorService.onApprove(bookId).subscribe(
      (data) => {
        if (data.status === 200) {
          this.messageService.changeBooks();
          this.snackBar.open("Book approved successfully", 'ok', {
            duration: 2000,
          });
        }
      },
      (error) => {
        this.snackBar.open("Failed to Approved", 'ok', {
          duration: 2000,
        });
      }
    );
  }
  
  onDisplayBooks(data) {
    console.log(data);
    if (data.status === 200) {
      this.size = data.data.length;
      data.data.forEach((bookData) => {
      this.books.push(bookData);
        
      });
    }
  }

  onDisapproval(bookId) {
    console.log(bookId);
    this.vendorService.deleteBooks(bookId).subscribe(
      (data) => {      
        this.messageService.changeBooks();
          this.snackBar.open("Book disapproved successfully", 'ok', {
            duration: 2000,
          })
      },
      (error: any) => {
        this.snackBar.open("Failed to disapproved book", 'ok', { duration: 2000 });
      }
    );
  }
 
}
