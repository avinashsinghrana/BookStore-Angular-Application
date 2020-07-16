import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Login } from 'src/app/models/login.model';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  response: any;
  successMsg: string;
  failedMsg: string;
  incorrectInput: string;
  toggle: boolean;
  isLogin: false;
  reqbody = {
    emailId: null,
    password: null,
  };
  constructor(
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Login
  ) {}

  ngOnInit(): void {}
  model = {};
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%!]).{8,40})'
    ),
  ]);

  //To display email error message
  getEmailErrorMessage() {
    return this.emailFormControl.hasError('required')
      ? 'Email id is required'
      : this.emailFormControl.hasError('email')
      ? 'Please enter valid email id'
      : ' ';
  }
  //To display password error message
  getPasswordErrorMessage() {
    return this.password.hasError('required')
      ? 'Password is required'
      : this.password.hasError('pattern')
      ? 'Please enter valid password'
      : ' ';
  }
  validate() {
    if (this.emailFormControl.valid && this.password.valid) {
      this.toggle = false;
      return 'false';
    }
    this.toggle = true;
    return 'true';
  }
  login() {
    this.spinner.show();
    this.reqbody.emailId = this.emailFormControl.value;
    this.reqbody.password = this.password.value;
    console.log(this.reqbody);
    this.userService.login(this.reqbody).subscribe(
      (data) => {
        console.log(data);
        this.dialogRef.close();
        this.spinner.hide();
        this.response = data;
        localStorage.setItem('email', this.reqbody.emailId);
        localStorage.setItem('name', this.response.message);
        localStorage.setItem('token', this.response.data);
        location.reload();
      },
      (err) => {
        this.spinner.hide();
        this.snackbar.open('Login Failed', 'Ok', { duration: 5000 });
      }
    );
  }
  register() {
    this.dialogRef.close();
    this.dialog.open(RegisterComponent, {
      width: '35%',
      height: 'auto',
    });
  }
  forgotpassword() {
    this.dialogRef.close();
    this.dialog.open(ForgotpasswordComponent, {
      width: '30%',
      height: 'auto',
    });
  }
}
