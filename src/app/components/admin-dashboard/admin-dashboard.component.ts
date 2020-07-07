import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { MessageService } from "../../services/message.service";
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  imgFile: File;
  response: any;
  img = localStorage.getItem('adminProfilePic');
  userService : UserService;

  firstName = "Naveen Kumar";
  lastName = 'Arukala'
  email = 'naveennani0711@gmail.com'
  url = null;
  fileUrl: File
  profile: string


  
  constructor(
    private router: Router,
    private messageService: MessageService,
    private dialog: MatDialog,
    ) { }
visible:boolean=true;
  ngOnInit(): void {
    this.messageService.changeMessages();
    if(localStorage.getItem("token")!=null){
      this.visible=false;
    }
  }
  signin(){
    this.dialog.open(LoginComponent, {
      width: '28%',
      height : 'auto'
    });
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
