import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddBookComponent} from '../add-book/add-book.component';
import {MessageService} from '../../services/message.service';
import {UserService} from '../../services/user.service';
import {LoginComponent} from '../login/login.component';
import {MatSnackBar} from '@angular/material';
import {RegisterComponent} from '../register/register.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {Sortmethod} from 'src/app/model/sortmethod';
import {Router} from '@angular/router';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {CartserviceService} from 'src/app/services/cartservice.service';
import {WishlistService} from '../../services/wishlist.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isBookFormOpened = false;
  searchTerm: string;
  file: any;
  profile: string;
  isLogin = false;
  popup = false;
  popDown = false;
  imgFile: File;
  response: any;
  isImage = false;
  img = 'https://ravi023.s3.ap-south-1.amazonaws.com/1594052103459-profile.png';
  username: string;
  usermail: string;
  sorting: Sortmethod[];
  item: any;
  wishitem: any;

  constructor(
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    private userService: UserService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cartServices: CartserviceService,
    private data: MessageService,
    private wishlistService: WishlistService
  ) {
  }

  ngOnInit() {
    if (+localStorage.getItem('fwsize') > 0) {
      this.wishitem = +localStorage.getItem('fwsize');
    } else {
      this.wishitem = '';
    }
    // this.messageService.changeWishItem(this.wishitem);
    this.messageService.currentWishItem$.subscribe(response => {
      const num1 = +localStorage.getItem('fwsize');
      if (num1 > 0) {
        this.wishitem = num1;
      } else {
        this.wishitem = '';
      }
    });
    this.messageService.changeMessages();
    if (localStorage.getItem(localStorage.getItem('email')) == null) {
      this.isImage = false;
    } else {
      this.isImage = true;
    }
    if (localStorage.getItem('token') != null && localStorage.getItem('roleType') === 'USER') {
      this.messageService.changeCartBook();
      this.data.changeItem(1);
      this.isLogin = true;
      this.img = localStorage.getItem(localStorage.getItem('email'));
      this.usermail = localStorage.getItem('email');
      this.username = localStorage.getItem('name');
    } else {
      this.isLogin = false;
      this.img = 'https://ravi023.s3.ap-south-1.amazonaws.com/1594052103459-profile.png';
    }
    this.messageService.currentItem$.subscribe(message => {
      const num1: number = +localStorage.getItem('mycartsize');
      const num2: number = +localStorage.getItem('size');
      console.log(num1);
      console.log(num2);
      const totalSize: number = num1 + num2;
      if (totalSize > 0) {
        this.item = totalSize;
      } else {
        this.item = '';
      }
    });
  }

  onCart() {
    this.router.navigate(['order-summary']);
  }

  signin() {
    this.dialog.open(LoginComponent, {
      width: '28%',
      height: 'auto'
    });
  }

  signup() {
    this.dialog.open(RegisterComponent, {
      width: '35%',
      height: 'auto'
    });
  }

  delete() {
    localStorage.removeItem(localStorage.getItem('email'));
  }

  onKey(event) {
    this.data.changeEvent(this.searchTerm);
  }

  Logout() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key[0] === 'c') {
        const obj = JSON.parse(localStorage.getItem(key));
        this.cartServices.addToBag(obj, key[1]).subscribe((message) => {
        });
      }
    }
    // for (let i = 0; i < localStorage.length; i++) {
    //   let key = localStorage.key(i);
    //   if (key[0] == 'w') {
    //     var obj = JSON.parse(localStorage.getItem(key));
    //     this.wishlistService.addToWishList(key[1], localStorage.getItem('token')).subscribe((message) => {
    //     });
    //   }
    // }
    this.img = localStorage.getItem(localStorage.getItem('email'));
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem(this.usermail, this.img);
    location.reload();
  }

  fileUpload($event) {
    this.spinner.show();
    this.setProfilePic($event);
  }

  setProfilePic($event) {
    if (this.isLogin === false) {
      this.snackbar.open('Please Login First', 'Ok', {duration: 2000});
      return;
    }
    this.imgFile = $event.target.files[0];
    const formData = new FormData();
    formData.append('file', this.imgFile);
    this.userService.profilePic(formData).subscribe(
      data => {
        console.log('------------------------------', data);
        this.response = data;
        this.spinner.hide();
        this.img = this.response.data;
        localStorage.setItem(localStorage.getItem('email'), this.response.data);
      },
      err => {
        this.spinner.hide();
        this.snackbar.open('Profile pic uplodation failed!!', 'Ok', {duration: 2000});
      });
  }

  openDialog() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('roleType') === 'USER') {
      const dialogRef = this.dialog.open(WishlistComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    } else {
      this.signin();
    }
  }
}
