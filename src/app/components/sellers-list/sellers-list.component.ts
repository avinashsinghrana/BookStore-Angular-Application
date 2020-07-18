import { UserService } from './../../services/user.service';
import { AdminBooksComponent } from './../admin-books/admin-books.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-sellers-list',
  templateUrl: './sellers-list.component.html',
  styleUrls: ['./sellers-list.component.scss'],
})
export class SellersListComponent implements OnInit {
  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.getSeller();
  }
  sellerList: [];
  size: any;

  getSeller() {
    this.userService.getAllSellers().subscribe((Response: any) => {
      //    this.unVerifiedBooks = Response.obj;

      console.log(Response);
      this.sellerList = Response.data;
      this.size = this.sellerList.length;
      console.log(this.sellerList);
      this.size = Response.data.length;
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   //this.books.splice(0);
    //   this.ngOnInit();
    // });
  }
  getSellerBooks(seller: any) {
    const dialogRef = this.dialog.open(AdminBooksComponent, {
      height: '600px',
      width: '1200px',
      data: seller,
    });
    // dialogConfig.data = {
    //   bookId: bookId,
    //   status: 'Approve',
    // };
    //const dialogRef = this.dialog.open(VerifydialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      //this.books.splice(0);
      this.ngOnInit();
    });
  }
  demoList = [
    {
      userId: 1,
      fullName: 'Naveen Kumar',
      emailId: 'naveenkumarrockzzzz711@gmail.com',
      mobileNumber: '9502884323',
      password: '$2a$10$cVqMDlU0K8EfxqO//Gi.kuQEmkvIB8zSJ5f.ax2H7Npf8UvZaYdN6',
      registeredAt: '2020-07-10T13:44:09',
      updatedAt: '2020-07-10T14:28:44',
      userStatus: true,
      profileUrl: null,
      seller_id: null,
      book: [],
      books: [],
      roleType: 'SELLER',
      userDetails: [],
      listOfUserDetails: [],
      verified: true,
    },
    {
      userId: 2,
      fullName: 'Naveen Kumar',
      emailId: 'naveennani0711@gmail.com',
      mobileNumber: '9502884323',
      password: '$2a$10$BiHtMurkM7.3vgyArszjs.5Xyy2jgIt2DuBRzWBhNqpDF1CRrGgoi',
      registeredAt: '2020-07-10T14:53:36',
      updatedAt: '2020-07-10T14:55:08',
      userStatus: true,
      profileUrl: null,
      seller_id: null,
      book: [],
      books: [],
      roleType: 'ADMIN',
      userDetails: [],
      listOfUserDetails: [],
      verified: true,
    },
    {
      userId: 3,
      fullName: 'Vidhya Shree',
      emailId: 'vidyashree.np@bridgelabz.com',
      mobileNumber: '8919836594',
      password: '$2a$10$b7cim3Ej3uQAyXPtjsYtweXhfJpXsC0Ng55KEY/dTQHv1s3sD8Jhm',
      registeredAt: '2020-07-10T15:20:20',
      updatedAt: '2020-07-10T15:22:23',
      userStatus: true,
      profileUrl: null,
      seller_id: null,
      book: [],
      books: [],
      roleType: 'SELLER',
      userDetails: [],
      listOfUserDetails: [],
      verified: true,
    },
    {
      userId: 4,
      fullName: 'Naveen Kumar',
      emailId: 'krravi015@gmail.com',
      mobileNumber: '8919836594',
      password: '$2a$10$cPOMz6XCObeYg2C2zBox/e8gYMY0kRcGU1K.VH3eRc4pbuhsgwNOu',
      registeredAt: '2020-07-10T15:35:02',
      updatedAt: '2020-07-10T15:37:09',
      userStatus: true,
      profileUrl: null,
      seller_id: null,
      book: [],
      books: [],
      roleType: 'USER',
      userDetails: [],
      listOfUserDetails: [],
      verified: true,
    },
  ];
}
