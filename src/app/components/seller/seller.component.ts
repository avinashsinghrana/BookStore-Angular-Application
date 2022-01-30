import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddBookComponent} from '../add-book/add-book.component';
import {MessageService} from '../../services/message.service';
import {UserService} from '../../services/user.service';
import {LoginComponent} from '../login/login.component';
import {MatSnackBar} from '@angular/material';
import {RegisterComponent} from '../register/register.component';
import {NgxSpinnerService} from 'ngx-spinner';
import { BaseURLFile } from 'src/app/base_url_file';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit {
  isBookFormOpened = false;
  searchTerm: string;
  file: any;
  baseUrl = BaseURLFile.ACTIVE_ROUTER;
  profile: string;
  isLogin = false;
  imgFile: File;
  response: any;
  isProfile = true;
  img = 'https://ravi023.s3.ap-south-1.amazonaws.com/1594052103459-profile.png';
  username: string;
  usermail: string;

  constructor(
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    private userService: UserService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private data: MessageService
  ) {
  }

  ngOnInit() {
    this.messageService.changeOnNewlyAdded();
    /*  if(localStorage.getItem(localStorage.getItem('email'))==null){
       this.isImage = false;
      }
      else{
        this.isImage = true;
      }*/
    if (localStorage.getItem('token') !== null && localStorage.getItem('roleType') === 'SELLER') {
      // this.messageService.changeOnNewlyAdded();
      this.isLogin = true;
      this.img = localStorage.getItem(localStorage.getItem('email'));
      this.usermail = localStorage.getItem('email');
      this.username = localStorage.getItem('name');
      if (this.img === null) {
        this.isProfile = false;
        // const intials =  this.username.split(' ').map(name => name[0]).join('').toUpperCase();
        const intials = this.username.substring(0, 1);
        document.getElementById('profileImage').innerHTML = intials;
        // document.getElementById('profileInnerImage').innerHTML = intials;
      }
    } else {
      this.isLogin = false;
      this.img = 'https://ravi023.s3.ap-south-1.amazonaws.com/1594052103459-profile.png';
    }
    // document.getElementById('profileImage').innerHTML = intials;
    // document.getElementById('profileInnerImage').innerHTML = intials;
  }

  openBookForm() {
    if (this.isLogin === false) {
      this.signin();
      return;
    }
    this.dialog.open(AddBookComponent, {
      height: '80%'
    });
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
    this.img = 'R';
  }

  onKey(event) {
    this.data.changeEvent(this.searchTerm);
  }

  Logout() {
    localStorage.removeItem('token');
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
    let formData = new FormData();
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
}
