import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginView } from '../models/login-view.model';
import { RegisterView } from '../models/register-view.model';
import { JWT } from '../models/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<JWT>;
  public currentUser: JWT;
  public static EMPTY = new Object()
  public user : Observable<JWT>;


  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem('authToken');
    this.currentUser = userJson !== null ? JSON.parse(userJson) : new JWT();
    this.userSubject = new BehaviorSubject<JWT>(this.currentUser);
    this.user = this.userSubject.asObservable();
   }

  loginViaGoogle(tokenId : any) : Observable<boolean>{
    let params = new HttpParams().set("idToken", tokenId);
    return this.http.post<any>(`${environment.apiUrl}/auth/google` , null, {params :params} ).pipe(map((tokenValue : any) => {
      this.createJWT(tokenValue);
      return true;
    }));
  }

  loginViaNormal(email : string, password : string){
    var view = new LoginView();
    view.email = email;
    view.password = password;
    return this.http.post<any>(`${environment.apiUrl}/auth/normal` ,view).pipe(map((token : any) => {
      this.createJWT(token.jwt);
      return true;
    }));
  }

  register(view : RegisterView){
    return this.http.post<any>(`${environment.apiUrl}/auth/register`,view);
  }

  public get userValue(): JWT {
    return this.userSubject.value;
}

  createJWT(jwt : JWT){
    
      localStorage.setItem('authToken', JSON.stringify(jwt));
      this.userSubject.next(jwt);
  }
  logout() {
    // remove user from local storage to log user out

    localStorage.removeItem('authToken');
   

}
}
