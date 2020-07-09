import { RegisterComponent } from './../register/register.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { MessageService } from "../../services/message.service";
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  imgFile: File;
  response: any;
 
  isBookFormOpened = false;
  searchTerm: string;
  file: any;
  profile: string;
  isLogin = false;
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
    ) { }
visible:boolean=true;
  ngOnInit(): void {
//    this.messageService.changeMessages();
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

 

//   fileUpload($event) {
  
//     this.setProfilePic($event)
//   }
//  setProfilePic($event) {
//      this.imgFile = $event.target.files[0];
//      var formData = new FormData();
//   formData.append("file", this.imgFile);
//   this.userService.profilePic(formData).subscribe(
//     data => {
//     this.response = data;
//     localStorage.setItem('adminProfilePic', this.response.message);
//   //  this.snackbar.open("Profile pic uploded Successful!!", "Ok", { duration: 2000 });
//   },
//   err => {
//     // this.snackbar.open("Profile pic uplodation failed!!", "Ok", { duration: 2000 });
//   });
//   //location.reload;
//   }

onSubmit(file: File) {
  console.log(file);

  this.userService.uploadProfilePic(file).subscribe(
    (response: any) => {
      console.log("login true");
      localStorage.setItem('fileUrl', response.fileUrl);
      //this.snackBar.open("Successfully Uploaded", "Okay", { duration: 2000 })
    }, error => {
      console.log('Error')
      //this.snackBar.open("error in uploading", "try again", { duration: 2000 })
    });
}


  signout(){
    localStorage.removeItem('token');
    this.visible=true;
    location.reload();
  }
  adminPage(){
    this.router.navigate(['/admin']);
  }
}
