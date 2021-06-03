import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostProfileView } from '../models/post-profile-view';
import { PotentialContactView } from '../models/potential-contact-view';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  PostProfile(name : string, gender : string, profileId : string){
    var post = new PostProfileView();
    post.displayName = name;
    post.gender = gender;
    post.profileId = profileId;
    return this.http.post<any>(`${environment.apiUrl}/profile/post`, post)
   }

   GetProfile(id : string){
    return this.http.get<any>(`${environment.apiUrl}/profile/` + id)
   }

   GetPotentialProfiles(name : string, userId : string){
    let params = new HttpParams().set("name",name).set("profileId", userId);
    return this.http.get<PotentialContactView[]>(`${environment.apiUrl}/api/profile/contact` , {params : params} );
   }
}
