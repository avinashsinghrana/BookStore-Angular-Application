import {Component, OnInit} from '@angular/core';
import {SellerService} from '../../services/seller.service';
import {MessageService} from '../../services/message.service';
import {MatSnackBar, MatDialog} from '@angular/material';
import {UpdateBookComponent} from '../update-book/update-book.component';
import {Book} from 'src/app/models/book.model';
import {BookRejectionComponent} from '../bookRejection/bookRejection.component';

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
  page: number = 1;
  isActive: boolean = false;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  isLogin: boolean = false;

  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.onNewlyAdded();

    if (localStorage.getItem('token') !== null && localStorage.getItem('roleType') === 'SELLER') {
      this.isLogin = true;
    }
    this.messageService.currentEvent$.subscribe(message => {
      this.searchTerm = message;
    });
  }

  onNewlyAdded() {
    this.status1 = true;
    this.status2 = false;
    this.status3 = false;
    this.messageService.changeOnNewlyAdded();
    this.messageService.currentNewlyAdded.subscribe((data) => {
      this.books = [];
      console.log('new book', data);
      this.onDisplayBooks(data);
    });
  }

  onDisapproved() {
    this.status1 = false;
    this.status2 = true;
    this.status3 = false;
    this.messageService.changeOnDisapproved();
    this.messageService.currentDisapproved.subscribe((data) => {
      this.books = [];
      console.log('disapproved book', data);
      this.onDisplayBooks(data);
    });
  }

  onApproved() {
    this.status1 = false;
    this.status2 = false;
    this.status3 = true;
    this.messageService.changeOnApproved();
    this.messageService.currentApproved.subscribe((data) => {
      this.books = [];
      console.log('approved book', data);
      this.onDisplayBooks(data);
    });

  }

  onApprovalRequest(bookId) {
    console.log(bookId);
    this.vendorService.sendApprovalRequest(bookId).subscribe(
      (data) => {
        //  this.messageService.changeMessage();
        this.ngOnInit();
      },
      (error: any) => {
        this.snackBar.open('Book Deletion Failed', 'ok', {duration: 2000});
      }
    );
  }

  onBookDetail(event) {
    event.stopPropagation();
  }

  onKey(event) {
    this.searchTerm = event;
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

  notification(reason: any) {
    localStorage.setItem('reason', reason);
    this.dialog.open(BookRejectionComponent);
  }

  onDeleteBook(bookId) {
    console.log(bookId);
    this.vendorService.deleteBooks(bookId).subscribe(
      (data) => {
        //  this.messageService.changeMessage();
        this.ngOnInit();
      },
      (error: any) => {
        this.snackBar.open('Book Deletion Failed', 'ok', {duration: 2000});
      }
    );
  }

}
