import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userservice : UserService,private router: Router,private snackBar: MatSnackBar) { }

  private token :string;
  ngOnInit() {
    this.token=this.route.snapshot.paramMap.get('token');
  }

  onVerify(){
    this.userservice.verification(this.token).subscribe((response:any)=>{
      console.log(response);
      // if(response.statusCode === 200){
        this.snackBar.open("User Verified Successfully",'ok',{duration:3000});
        this.router.navigate(['user-dashboard/user-books']);
      }
    ,(error:any)=>{
      this.snackBar.open("User Already Verified",'ok',{duration:3000})
    })
  }

}

