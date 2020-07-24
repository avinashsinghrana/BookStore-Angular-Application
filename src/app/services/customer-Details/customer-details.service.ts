import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {

  constructor(private httpService: HttpService) { }

  addDetails(data, locationType, token) {

    return this.httpService.POST('/user/addUserDetails?locationType='+locationType+'&token=' + token, data, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }

  getUserDetails() {
    return this.httpService.getDetails('http://localhost:8081/user/getUserDetails?token=' + localStorage.getItem('token'));
  }
}

