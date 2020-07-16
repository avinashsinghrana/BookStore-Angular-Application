import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { MessageService } from '../../services/message.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { Book } from 'src/app/models/book.model';
import { VerifydialogComponent } from '../verifydialog/verifydialog.component';

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
  page: number = 1;
  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private data: MessageService,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.sortTerm = 'none';
    this.messageService.changeMessages();
    this.messageService.currentBooks.subscribe((data) => {
      this.books = [];
      // this.onDisplayBooks(data);
    });
    this.messageService.currentEvent$.subscribe((message) => {
      this.searchTerm = message;
    });
    if (localStorage.getItem('token') != null) {
      this.getAllBooks();
    }
  }
  onBookDetail(event) {
    event.stopPropagation();
  }
  /*
  onSelect(val: any){
   this.sortTerm = val;
   console.log("sorting term",this.sortTerm);
  }*/
  onApproved() {
    this.snackBar.open('Book AlreadyApproved', 'ok', {
      duration: 2000,
    });
  }

  onApproval(bookId: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      bookId: bookId,
      status: 'Approve',
    };
    const dialogRef = this.dialog.open(VerifydialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      //this.books.splice(0);
      this.ngOnInit();
    });
    // this.vendorService.onApprove(bookId).subscribe(
    //   (data) => {
    //     if (data.status === 200) {
    //       this.messageService.changeBooks();
    //       this.ngOnInit();
    //       this.snackBar.open('Book approved successfully', 'ok', {
    //         duration: 2000,
    //       });
    //     }
    //   },
    //   (error) => {
    //     this.snackBar.open('Failed to Approved', 'ok', {
    //       duration: 2000,
    //     });
    //   }
    // );
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

  bookList: [];
  getAllBooks() {
    this.userService.getAllBooks().subscribe((Response: any) => {
      //    this.unVerifiedBooks = Response.obj;

      console.log(Response);
      this.bookList = Response.data;
      this.size = Response.data.length;
    });
  }

  onDisapproved() {
    this.snackBar.open('Book Already disapproved', 'ok', {
      duration: 2000,
    });
  }

  onDisapproval(bookId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      bookId: bookId,
      status: 'DisApprove',
    };
    const dialogRef = this.dialog.open(VerifydialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      //this.books.splice(0);
      this.ngOnInit();
    });

    // this.vendorService.ondisapprove(bookId).subscribe(
    //   (data) => {
    //     this.messageService.changeBooks();
    //     this.ngOnInit();
    //     this.snackBar.open('Book disapproved successfully', 'ok', {
    //       duration: 2000,
    //     });
    //   },
    //   (error: any) => {
    //     this.snackBar.open('Failed to disapproved book', 'ok', {
    //       duration: 2000,
    //     });
    //   }
    // );
  }

  // onDisapproval(bookId) {
  //   console.log(bookId);
  //   this.vendorService.deleteBooks(bookId).subscribe(
  //     (data) => {
  //       this.messageService.changeBooks();
  //       this.snackBar.open('Book disapproved successfully', 'ok', {
  //         duration: 2000,
  //       });
  //     },
  //     (error: any) => {
  //       this.snackBar.open('Failed to disapproved book', 'ok', {
  //         duration: 2000,
  //       });
  //     }
  //   );
  // }
}
