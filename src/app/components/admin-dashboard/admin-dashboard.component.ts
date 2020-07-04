import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  
  constructor(
    private router: Router,
    ) { }
visible:boolean=true;
  ngOnInit(): void {
    if(localStorage.getItem("token")!=null){
      this.visible=false;
    }
  }

  adminPage(){
    this.router.navigate(['/admin']);
  }
}
