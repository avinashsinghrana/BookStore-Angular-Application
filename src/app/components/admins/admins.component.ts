import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddBookComponent } from '../add-book/add-book.component';
import { MessageService } from "../../services/message.service";
import { UserService } from "../../services/user.service";
import { LoginComponent } from '../login/login.component';
import { MatSnackBar } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Sortmethod } from 'src/app/model/sortmethod';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  isBookFormOpened = false;
  searchTerm: string;
  file: any;
  profile: string;
  isLogin = false;
  imgFile: File;
  response: any;
  isImage = false;
  img = "https://ravi023.s3.ap-south-1.amazonaws.com/1594052103459-profile.png";
  username: string;
  usermail: string;
  sorting: Sortmethod[];
  item: number;
  constructor(
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    private userService: UserService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private data: MessageService
  ) {}

  ngOnInit() {
    this.messageService.changeBooks();
    this.messageService.currentItem$.subscribe(message =>
      { this.item = message});
      console.log("recv ",this.item);
    if(localStorage.getItem(localStorage.getItem('email'))==null){
     this.isImage = false;
    }
    else{
      this.isImage = true;
    }
    if (localStorage.getItem('token')!=null && localStorage.getItem('roleType') === 'ADMIN') {
      this.isLogin = true;
      this.img = localStorage.getItem(localStorage.getItem('email'));
      this.usermail = localStorage.getItem('email');
      this.username = localStorage.getItem("name");
    } else {
      this.isLogin = false;
      this.img = "https://ravi023.s3.ap-south-1.amazonaws.com/1594052103459-profile.png";
    }
  }

  openBookForm() {
    if(this.isLogin==false){
      this.snackbar.open("Please Login First", "Ok", { duration: 2000 });
      return;
    }
  }
  onCart(){
    this.router.navigate(['/order-summary']);
  }
  signin(){
    this.dialog.open(LoginComponent, {
      width: '28%',
      height : 'auto'
    });
  }
  signup(){
    this.dialog.open(RegisterComponent, {
      width: '35%',
      height : 'auto'
    });
  }
  delete(){
    localStorage.removeItem(localStorage.getItem('email'))
  }
  onKey(event){
    this.data.changeEvent(this.searchTerm);
  }
  Logout() {
    localStorage.removeItem('token');
    location.reload();
  }
  fileUpload($event) {
     this.setProfilePic($event)
  }
 setProfilePic($event) {
      if(this.isLogin==false){
        this.snackbar.open("Please Login First", "Ok", { duration: 2000 });
        return;
      }
      this.spinner.show();
     this.imgFile = $event.target.files[0];
     var formData = new FormData();
     formData.append("file", this.imgFile);
     this.userService.profilePic(formData).subscribe(
     data => {
     console.log("------------------------------", data);
     this.response = data;
     this.spinner.hide();
     this.img = this.response.data;
     localStorage.setItem(localStorage.getItem('email'), this.response.data);
  },
  err => {
     this.spinner.hide();
     this.snackbar.open("Profile pic uplodation failed!!", "Ok", { duration: 2000 });
  });
  }
}
