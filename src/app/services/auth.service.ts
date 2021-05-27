import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PotentialContactView } from '../models/potential-contact-view';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginViaGoogle(tokenId : any) : Observable<boolean>{
    let params = new HttpParams().set("idToken", tokenId);
    return this.http.post<any>(`${environment.apiUrl}/auth/google` , null, {params :params} ).pipe(map((tokenValue : any) => {
      localStorage.setItem("authToken", tokenValue);
      return true;
    }));
  }
}
