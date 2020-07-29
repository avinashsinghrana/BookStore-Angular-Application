import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserService } from "src/app/services/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resetpassword } from 'src/app/model/resetpassword.model';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})

export class ResetpasswordComponent implements OnInit {
  
  loading = false;
  submitted = false;
  hide=true;
  successMsg: string;
  failedMsg: string;
  incorrectInput: string;
  public id = this.route.snapshot.params.id;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  public resetPasswordForm: FormGroup;
  resetPassword: Resetpassword = new Resetpassword();
  private token: string;
 
  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: new FormControl(this.resetPassword.newPassword, [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]),
      confirmPassword:new FormControl(this.resetPassword.confirmPassword, [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")])
    });
    this.token = localStorage.getItem('token');
  }

  get f() { return this.resetPasswordForm.controls; }

onSubmit(resetPassword) {
  this.submitted = true;
  if (this.resetPassword.newPassword != this.resetPassword.confirmPassword) throw "New Password and Confirm Password does not match";
  if (this.resetPassword.newPassword === '' || this.resetPassword.confirmPassword === '') throw "Empty fields";
    const data={
      newPassword:this.resetPasswordForm.get('newPassword').value,
      confirmPassword:this.resetPasswordForm.get('confirmPassword').value
    }
   // console.log("data:",data);
    console.log("token:",this.token);
    this.userService.resetPassword(data, this.token).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.removeItem("token");
          this.snackBar.open("Password updated successfully now you can login", "Ok", { duration: 3000 })
          this.router.navigate(['user-dashboard/user-books']);
        }
         
      },
      (error: any) => {
        //console.log(error);
         this.snackBar.open("Password updated Failed", "Ok", { duration: 3000 })
      }
    );
  }
}
