import { CartserviceService } from 'src/app/services/cartservice.service';
import { BookserviceService } from './../../services/bookservice/bookservice.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { HttpService } from 'src/app/services/http.service';

interface BookSortBy {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss']
})
export class UserBooksComponent implements OnInit {

  books: any;
  size: number;
  id: any;
  isUser = false;
  isSeller = false;
  toggle = true;
  bookSearch: any;
  selectedOption: any;
  sortbyprice = "none";
  page: number = 1;
  budgetTotal;
  cartSize=null;
  constructor(
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private bookService: BookserviceService,
    private userService: UserService,
    private cartService: CartserviceService
  ) { }

  ngOnInit() {
    this.getAllBookList();
    /* this.bookService.autoRefresh$.subscribe(() => {
       console.log("works");
      /// this.getSellerBook();
     });*/
  }

  sortBooks: BookSortBy[] = [
    {value: 'High to low-0', viewValue: 'Steak'},
    {value: 'low To High-1', viewValue: 'Pizza'},
    {value: 'By Book-2', viewValue: 'Tacos'}
  ];

  getAllBookList() {
    this.bookService.getBookList().subscribe((message) => {
      console.log(message);
      this.books = message.data;
      this.size = message.data.length;
      console.log("geeth" + this.size);
    });

    this.getSearchBookData();
  }

  addToBag(bookId) {
    this.toggle = !this.toggle;
    this.cartService.addToBag(bookId).subscribe((message) => {
      console.log(message);
      this.matSnackBar.open("Book Added to Bag SuccessFully", "OK", { duration: 4000 });
      this.cartSize += 1;
    });
  }
  selectedLevel;
  data: Array<Object> = [{ id: 0, name: "Price:High To Low" },
  { id: 1, name: "Price:Low To High" },
  { id: 2, name: "sort by relevance" }];

  selected() { console.log(this.selectedLevel) }

  getSearchBookData() {
    this.bookService.getSearchBookData().subscribe((message) => {
      console.log("search data", message.books);
      this.bookSearch = message.books;
    });
  }
  onclicksort() {
    if (this.selectedLevel === "none") {
      this.ngOnInit();
    }
    this.sortbyprice = this.selectedOption;
    console.log(this.sortbyprice);
  }

  /*  getCartItems() {
      this.cartService.getCartList().subscribe((message) => {
        console.log("sss");
        this.budgetTotal = message.orders.length;
      });
    }
   / setBudgetTotal() {
      this.getCartItems();
      this.cartService.setBudgetTotal(this.budgetTotal);
    }*/
}
