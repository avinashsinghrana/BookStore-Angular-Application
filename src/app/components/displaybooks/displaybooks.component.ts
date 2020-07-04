import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import{BookserviceService} from 'src/app/services/bookservice/bookservice.service'
import { CartserviceService } from 'src/app/services/cartservice.service';

@Component({
  selector: 'app-displaybooks',
  templateUrl: './displaybooks.component.html',
  styleUrls: ['./displaybooks.component.scss']
})
export class DisplaybooksComponent implements OnInit {
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
  constructor(
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private bookService: BookserviceService,
    private userService: UserService,
    private cartService: CartserviceService
  ) {
    
    this.bookService.autoRefresh$.subscribe(() => {
      this.getAllBookList();
     /// this.getSellerBook();
    });

    this.setBudgetTotal();
    this.getCartItems();
  }

  ngOnInit() {}

  getAllBookList() {
    this.bookService.getBookList().subscribe((message) => {
      console.log(message);
      this.books = message.bookList;
      this.size = message.bookList.length;
    });

    this.getSearchBookData();
  }

  addToBag(bookId, quantity) {
    this.toggle = !this.toggle;
    this.cartService.addToBag(bookId, 1).subscribe((message) => {
      console.log(message);
      this.matSnackBar.open("Book Added to Bag SuccessFully", "OK", {
        duration: 4000,
      });
      this.setBudgetTotal();
    });
  }

  getSearchBookData() {
    this.bookService.getSearchBookData().subscribe((message) => {
      console.log("search data", message.books);
      this.bookSearch = message.books;
    });
  }
  onclicksort() {
    if (this.selectedOption === "none") {
      this.ngOnInit();
    }
    this.sortbyprice = this.selectedOption;
    console.log(this.sortbyprice);
  }

  getCartItems() {
    this.cartService.getCartList().subscribe((message) => {
      console.log("sss");
      this.budgetTotal = message.orders.length;
    });
  }
  setBudgetTotal() {
    this.getCartItems();
    this.cartService.setBudgetTotal(this.budgetTotal);
  }
}
