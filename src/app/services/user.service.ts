import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private messageSource = new BehaviorSubject('user0@hotmail.com');
  
  constructor(private http: HttpClient) { }

  getUser(){
  
  return  this.http.get<User>(`${environment.apiUrl}/api/mock/` + this.messageSource.getValue() );
   // let user : User = new User("1", "Roel", "This is my status", "","Male");
    // return testUser;
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  getMessage(){
    return this.messageSource;
  }
}
