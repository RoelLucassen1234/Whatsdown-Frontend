import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(){
  return  this.http.get<User>(`${environment.apiUrl}/api/mock`);
   // let user : User = new User("1", "Roel", "This is my status", "","Male");
    // return testUser;
  }
}
