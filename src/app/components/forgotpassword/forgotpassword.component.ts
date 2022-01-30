import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  forgotForm: FormGroup;
  loading = false;
  submitted = false;
  response: any;
  successMsg: string;
  failedMsg: string;
  incorrectInput: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private userService: UserService,
              private snackBar: MatSnackBar, private dialog: MatDialog,
              private dialogRef: MatDialogRef<ForgotpasswordComponent>,
  ) {
  }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]]
    });
  }

  get f() {
    return this.forgotForm.controls;
  }

  login() {
    this.dialog.open(LoginComponent, {
      width: '28%',
      height: 'auto'
    });
  }

  onSubmit(user) {
    this.dialogRef.close();
    this.submitted = true;
    if (this.forgotForm.invalid) {
      return;
    }
    console.log(user);
    this.userService.forgotPassword(user).subscribe(
      data => {
        console.log('reset password mail sent to your email');
        console.log(data);
        this.response = data;
        localStorage.setItem('token', this.response.token);
        this.snackBar.open('ResetPassword link sent successfully', 'Ok', {duration: 3000});

      },
      error => {
        this.snackBar.open('Please enter the registered email', 'Ok', {duration: 3000});

      }
    );
  };
}
