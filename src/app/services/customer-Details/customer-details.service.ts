import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {

  constructor(private httpService: HttpService) { }

  addDetails(data, token) {

    return this.httpService.POST('/user/addUserDetails?token=' + token, data, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }

  getUserDetails() {
    return this.httpService.getDetails('/user/getUserDetails?token=' + localStorage.getItem('token'));
  }
}

