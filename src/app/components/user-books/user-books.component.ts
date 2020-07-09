import { Component, OnInit } from '@angular/core';
import { SellerService } from "../../services/seller.service";
import { MessageService } from "../../services/message.service";
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { Book } from 'src/app/models/book.model';
import { CartServiceService } from 'src/app/services/cart-service/cart-service.service';
import { CartserviceService } from 'src/app/services/cartservice.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  // <ul>
//   <li *ngFor="let item of collection | paginate: { currentPage: currentPage, itemsPerPage: itemsPerPage }; let i = index">
//     {{ itemsPerPage * (currentPage - 1) + i }}
//   </li>
// </ul>
  styleUrls: ['./user-books.component.scss'],
})
export class UserBooksComponent implements OnInit {
  // p: number = 1;
  // collection: any[] = someArrayOfThings; 
  books = [];
  book: Book[];
  searchTerm: string;
  message: string;
  size: any;
  sortTerm: string;
  item = 0;
  add: false;
  toggle = true;

  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private cartService: CartServiceService,
    private cartServices: CartserviceService,
    private data: MessageService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
   
    this.sortTerm = 'none';
    this.messageService.currentMessages.subscribe((data) => {
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
  }
  onSelect(val: any){
   this.sortTerm = val;
   console.log("sorting term",this.sortTerm);
  }
  onWish() {
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

  
  onAddBook(bookId) {
    this.toggle = !this.toggle;
    this.item++;
    this.data.changeItem(this.item);
    this.cartServices.addToBag(bookId).subscribe((message) => {
      console.log(message);
      this.snackBar.open("Book Added to Bag SuccessFully", "OK", {
        duration: 4000,
      });
    });
  }

}
