import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public http:HttpClient) { }

  private registerUrl = 'http://localhost:4000/users/register/';
  private loginUrl = 'http://localhost:4000/users/login/';

  login(data) {
    return this.http.post(this.loginUrl, data);
  }

  register(user: IUser) {
    return this.http.post(this.registerUrl, user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getLoggedUser() {
    return this.http.post('http://localhost:4000/users/loggeduser/', {});
  }

  logOut(){
    localStorage.removeItem('token');
  }

}
