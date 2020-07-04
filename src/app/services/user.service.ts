import { Injectable } from '@angular/core';
import { HttpService } from "./../services/http.service";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private service: HttpService) { }

  login(body: any) {
    return this.service.postUser(body, environment.loginPath);
  }
  register(body: any) {
    return this.service.postUser(body, environment.registrationPath);
  }
  getAllUnverifiedBooks(token: string) {
    return this.service.http.get('http://localhost:8080/admin/getBooksForVerification/'+token);
  }
}
