import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PotentialContactView } from '../models/potential-contact-view';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


  getPotentialContacts(name : string, userId : string){
    let params = new HttpParams().set("name",name).set("profileId", userId);
    return this.http.get<PotentialContactView[]>(`${environment.apiUrl}/api/contact` , {params : params} );
    
   }

}
