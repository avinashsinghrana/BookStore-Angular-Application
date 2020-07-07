import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLogin=false;
  imgFile: any;
  response: any;
  usermail: string;
  username: string;
  img = "https://ravi023.s3.ap-south-1.amazonaws.com/1593769264470-profile.png";

  constructor(private route: ActivatedRoute, public snackbar: MatSnackBar,private userService: UserService,
    private router: Router,public dialog: MatDialog,) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')!=null) {
      this.isLogin = true;
      this.img = localStorage.getItem(localStorage.getItem('email'));
      this.usermail = localStorage.getItem('email');
    } else {
      this.isLogin = false;
      this.img = "https://ravi023.s3.ap-south-1.amazonaws.com/1593769264470-profile.png";
    }
  }
  onCart() {
    this.router.navigate(["books/viewcart"]);
  }
  onwhishlist() {
    this.router.navigate(["books/whishlist"]);
  }
  signin(){
    this.dialog.open(LoginComponent, {
      width: '28%',
      height : 'auto'
    });
  }
  Logout() {
    localStorage.removeItem("token");
   // localStorage.clear();
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
  }
}