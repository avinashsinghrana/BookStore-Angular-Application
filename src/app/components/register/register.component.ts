import {Component, OnInit, Inject} from '@angular/core';
import {
  FormControl,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import {MatRadioChange, MatDialog} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSnackBar, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMsg: string;
  passwordMsg: string;
  myPatt: string;
  toggle: boolean;
  response: any;
  changeButton: boolean = false;
  showSpinner = false;

  constructor(
    private router: Router,
    public userService: UserService,
    private snackbar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
  }

  model = {};
  hide = true;
  fullName = new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-z]+(\\s[A-Z][a-z]+)*$')]);
  mobileNumber = new FormControl('', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]);
  emailId = new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]);
  password = new FormControl('', [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%!]).{8,40})')]);
  person = String;

  //To display firstname error message.
  getFullnameErrorMessage() {
    return this.fullName.hasError('required')
      ? 'First name is required'
      : this.fullName.hasError('pattern')
        ? 'Please enter a valid name'
        : ' ';
  }

  getMobileErrorMessage() {
    return this.mobileNumber.hasError('required')
      ? 'Mobile number is required'
      : this.mobileNumber.hasError('pattern')
        ? 'Please enter a valid mobile number'
        : ' ';
  }

  //To display email error message
  getEmailErrorMessage() {
    return this.emailId.hasError('required')
      ? 'Email id is required'
      : this.emailId.hasError('pattern')
        ? 'Please enter a valid email id'
        : ' ';
  }

  //To display password error message
  getPasswordErrorMessage() {
    return this.password.hasError('required')
      ? 'Password is required'
      : this.password.hasError('pattern')
        ? 'Please enter a valid password'
        : ' ';
  }

  validate() {
    if (this.emailId.valid && this.password.valid && this.fullName.valid &&
      this.mobileNumber.valid) {
      this.toggle = false;
      return 'false';
    }
    this.toggle = true;
    return 'true';
  }

  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.person = mrChange.value;
    console.log(this.person);

  }

  register() {
    this.showSpinner = true;
    var reqbody = {
      fullName: this.fullName.value,
      mobileNumber: this.mobileNumber.value,
      emailId: this.emailId.value,
      password: this.password.value,
      roleType: this.person,
    };
    this.spinner.show();
    console.log(' Value is : ', reqbody);
    this.userService.register(reqbody).subscribe(
      data => {
        console.log(data);
        this.response = data;
        this.spinner.hide();
        this.snackbar.open('User registered Successfully! A verification link is send to registered emailid', 'ok', {duration: 5000});
        this.dialogRef.close();
        this.dialog.open(LoginComponent, {
          width: '28%',
          height: 'auto'
        });
      },
      err => {
        console.log(err);
        this.snackbar.open('Registeration Failed!!', 'ok', {duration: 3000});
        this.spinner.hide();
      });
  }
}
