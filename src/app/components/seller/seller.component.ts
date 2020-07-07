import { Component, OnInit,ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddBookComponent } from '../add-book/add-book.component';
import { MessageService } from "../../services/message.service";
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit, OnChanges {
  isBookFormOpened = false;
  searchTerm: string;
  file: any;
  profile: string;
  isLogin = false;
  imgFile: File;
  response: any;
  img = "https://ravi023.s3.ap-south-1.amazonaws.com/1594052103459-profile.png";
  username: string;
  usermail: string;
  updateStats: any;
  userProfile: any;

  constructor(
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    private userService: UserService,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error("Method not implemented.");
  }

  ngOnInit() {
    this.messageService.changeMessage();
    if (localStorage.getItem('token')!=null) {
      this.isLogin = true;
      this.img = localStorage.getItem(localStorage.getItem('email'));
      this.usermail = localStorage.getItem('email');
      this.username = localStorage.getItem("name");
    } else {
      this.isLogin = false;
      this.img = "https://ravi023.s3.ap-south-1.amazonaws.com/1594052103459-profile.png";
    }
  }
  openDialogztoedit() {
   // this.dialog.open(EditProfileComponent);
  }
  openBookForm() {
    if(this.isLogin==false){
      this.snackbar.open("Please Login First", "Ok", { duration: 2000 });
      return;
    }
    this.dialog.open(AddBookComponent, {
      height : '80%'
    });
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
    this.img = "R";
  }
  navigateTo() {
    this.router.navigate(['/sellerDashboard']);
  }
  serch(){
    console.log("item ",this.searchTerm);
    localStorage.setItem('searchTerm',this.searchTerm);
  }
  onKey(event) {
    this.searchTerm = event;
   // this.messageService.searchBook(event);
  }
  Logout() {
    localStorage.removeItem('token');
    location.reload();
  }
  fileUpload($event) {
    console.log("jhgdhs==>", $event);

    this.setProfilePic($event)
  }
 setProfilePic($event) {
      if(this.isLogin==false){
        this.snackbar.open("Please Login First", "Ok", { duration: 2000, verticalPosition: 'top',
        horizontalPosition:'right' });
        return;
      }
     this.imgFile = $event.target.files[0];
     var formData = new FormData();
     formData.append("file", this.imgFile);
     this.userService.profilePic(formData).subscribe(
     data => {
     console.log("------------------------------", data);
     this.response = data;
     this.img = this.response.data;
     this.cdRef.detectChanges();
     localStorage.setItem(localStorage.getItem('email'), this.response.data);
     this.snackbar.open("Profile pic uploded Successful!!", "Ok", { duration: 2000 });
  },
  err => {
     this.snackbar.open("Profile pic uplodation failed!!", "Ok", { duration: 2000 });
  });
  }
}
