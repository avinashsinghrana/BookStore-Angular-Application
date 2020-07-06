import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
 

  constructor(private httpService: HttpService) { }

 addDetails(data){
  var userId=1;
  return this.httpService.POST('/user/addUserDetails?userId='+userId, data);
}

}