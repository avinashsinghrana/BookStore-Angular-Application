import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddBookComponent } from '../add-book/add-book.component';
import { MessageService } from "../../services/message.service";
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit {
  isBookFormOpened = false;
  file: any;
  profile: string;
  isProfile = 'true';
  isLogin = false;
  isProfileAvailable = false;
  login: boolean;
  imgFile: File;
  response: any;
  img = "https://ravi023.s3.ap-south-1.amazonaws.com/1593769264470-profile.png";
  //img = localStorage.getItem(localStorage.getItem('email'));
  username: string;
  usermail: string;
  updateStats: any;
  userProfile: any;

  constructor(
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.isLogin = 'true';
    this.messageService.changeMessage();
    this.usermail = localStorage.getItem('email');
    this.username = localStorage.getItem(this.usermail);
    this.userProfile = localStorage.getItem('image');
    if (this.userProfile != null) {
      this.isProfileAvailable = true;
      this.profile = this.userProfile;
    } else {
      console.log(localStorage.getItem('image'));
      this.isProfileAvailable = false;
    }
    if (this.usermail != null) {
      this.isLogin = true;
      this.img = localStorage.getItem(localStorage.getItem('email'));
    } else {
      this.isLogin = false;
      this.img = "https://ravi023.s3.ap-south-1.amazonaws.com/1593769264470-profile.png";
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
  navigateTo() {
    this.router.navigate(['/sellerDashboard']);
  }
  onKey(event: any) {
   // this.messageService.searchBook(event);
  }
  Logout() {
    console.log('CAME TO LOGOUT');
   // localStorage.removeItem("stoken");
    localStorage.clear();
    console.log(localStorage.length);
    location.reload();
  }
  fileUpload($event) {
    console.log("jhgdhs==>", $event);

    this.setProfilePic($event)
  }
 setProfilePic($event) {
      if(this.isLogin==false){
        this.snackbar.open("Please Login First", "Ok", { duration: 2000 });
        return;
      }
     this.imgFile = $event.target.files[0];
     var formData = new FormData();
  formData.append("file", this.imgFile);
  this.userService.profilePic(formData).subscribe(
    data => {
    console.log("------------------------------", data);
    this.response = data;
    localStorage.setItem(localStorage.getItem('email'), this.response.data);
    this.snackbar.open("Profile pic uploded Successful!!", "Ok", { duration: 2000 });
  },
  err => {
     this.snackbar.open("Profile pic uplodation failed!!", "Ok", { duration: 2000 });
  });
  //location.reload;
  }
 /* OnSelectedFile(event) {
    console.log(event.target.files[0]);
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', this.file);
      this.file.inProgress = true;
      console.log('FormData:', formData.get('file'));
      this.userService
        .uploadProfie(formData, this.isProfile)
        .subscribe((result: any) => {
          console.log('PROFILE RESULT:', result);
          if (result.status === 200) {
            localStorage.setItem('image', result.data);
            this.profile = result.data;
            console.log(this.profile);
          }
        });
    }
  }*/
}
