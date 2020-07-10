import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import {    MatDialog} from "@angular/material/dialog";
import {  MatDialogConfig } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { Book } from 'src/app/models/book.model';
import { SellerService } from 'src/app/services/seller.service';
// import { Book } from "src/app/models/book";
// import { Seller } from "src/app/models/seller";
// import { VerifyconfrimComponent } from "../verifyconfrim/verifyconfrim.component";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
    bookApproveStatus: boolean;
    size : number
   // @Input() book: Book;
    noOfBooks: number;
    visible: boolean;
   
    getCount: boolean = false;
    totalRate: number = 0;
    message: String;
    ratingArr: Array<any>;
    ratenumber: number;
    constructor(
      private snackBar: MatSnackBar,
      //private data: DataService,
      private userService : UserService,
      private httService : HttpService,
      private router: Router,
      private seller: SellerService,
      public snackbar: MatSnackBar,
      //private bookService: BookService,
      public dialog: MatDialog //private cartService: ViewcartService
    ) {}
    ngOnInit() {
      //this.data.currentMessage.subscribe((message) => (this.message = message));
      this.unverifiedBooks()
      if (localStorage.getItem("token") != null) {
        this.visible = true;
      }
    }
   
    bookList : [];
    unverifiedBooks() {
      this.userService.getAllUnverifiedBooks(localStorage.getItem('token')).subscribe((Response: any) => {
      //     this.unVerifiedBooks = Response.obj;
      console.log(Response);
      this.bookList = Response.data;
      this.size = Response.data.length;
      })
      // for (var len in Response.obj) {
      // this.userService
      //   .getRequest("seller/singleSeller/" + Response.obj[0]["sellerId"])
      //   .subscribe((Res: any) => {
      //     for (var len in Response.obj) {
      //       this.bookdto = Response.obj[len];
      //       this.bookdto.sellerName = Res.obj.sellerName;
      //       this.bookdto.sellerEmail = Res.obj.email;
      //       this.bookdto.sellerMobile = Res.obj.mobile;
      //       this.books.push(this.bookdto);
      //     }
      //   });
      //}
      // });
    }  

    disApproveBook(bookId){
      this.seller.deleteBooks(bookId).subscribe((Response: any)=>{
        this.unverifiedBooks()
      },
      err => {
        this.snackbar.open("Profile pic uplodation failed!!", "Ok", { duration: 2000 });
     })
    }

    approveBook(bookId :any){
      this.seller.onApprove(bookId).subscribe((Response:any) => {
        this.unverifiedBooks()
      },
      err => {
        this.snackbar.open("Profile pic uplodation failed!!", "Ok", { duration: 2000 });
     })
    }

    ratingAndReviews(book: any) {
      this.router.navigate(["books/details/" + book.bookId]);
    }
    //rate: Rating;
    color: any;
    total: any;
  }
  export enum StarRatingColor {
    primary = "primary",
    accent = "accent",
    warn = "warn",
  }