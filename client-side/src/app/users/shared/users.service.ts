import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(public http:HttpClient) { }

  getUser(id: number) {
    return this.http.get('http://localhost:4000/users/'+id);
  }

}
