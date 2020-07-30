import {Router} from '@angular/router';
import {UserService} from './../../services/user.service';
import {AdminBooksComponent} from './../admin-books/admin-books.component';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {MessageService} from '../../services/message.service';
import {Seller} from '../../model/seller.model';

@Component({
  selector: 'app-sellers-list',
  templateUrl: './sellers-list.component.html',
  styleUrls: ['./sellers-list.component.scss'],
})
export class SellersListComponent implements OnInit {

  searchTerm: string;

  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
  ) {
  }

  page: number = 1;
  sellerList: [];
  size: any;

  ngOnInit() {
    if (localStorage.getItem('token') != null && localStorage.getItem('roleType') === 'ADMIN') {
      this.getSeller();
    }
    this.messageService.currentEvent$.subscribe(message => {
      this.searchTerm = message;
    });
  }


  getSeller() {
    this.userService.getAllSellers().subscribe((Response: any) => {
      //    this.unVerifiedBooks = Response.obj;

      console.log(Response.data);
      this.sellerList = Response.data;
      this.size = this.sellerList.length;
      // console.log(this.sellerList);
      // this.size = Response.data.length;
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   //this.books.splice(0);
    //   this.ngOnInit();
    // });
  }


  getSellerBooks(seller: any) {
    this.router.navigate(['adminDashboard/admin-books/' + seller.sellerId]);
  }

  // getSellerBooks(seller: any) {
  //   const dialogRef = this.dialog.open(AdminBooksComponent, {
  //     height: '600px',
  //     width: '1200px',
  //     data: seller,
  //   });

  // dialogConfig.data = {
  //   bookId: bookId,
  //   status: 'Approve',
  // };
  //const dialogRef = this.dialog.open(VerifydialogComponent, dialogConfig);
  //  dialogRef.afterClosed().subscribe((result) => {
  //this.books.splice(0);
  //      this.ngOnInit();
  //   });
  // }

  newRequest(seller: Seller) {
    let newBook = 0;
    for (let i = 0; i < seller.book.length; i++) {
      if (!seller.book[i].isDisApproved && !seller.book[i].verfied && seller.book[i].isSendForApproval) {
        newBook++;
      }
    }
    return newBook;
  }
}
