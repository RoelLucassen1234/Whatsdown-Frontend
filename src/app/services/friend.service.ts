import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FriendRequestViewModel } from '../models/friend-request-view-model';
import { FriendViewModel } from '../models/friend-view-model';
import { RequestAnswerView } from '../models/request-answer-view';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

 

   getPotentialFriends(name : string){
    return this.http.get<any>(`${environment.apiUrl}/friends/potential`+ name)
   }

   getPendingRequests(){
    
    return this.http.get<FriendRequestViewModel>(`${environment.apiUrl}/api/friends/pending`)
   }

   sendFriendRequest(friendId: string){
    var model :  FriendRequestViewModel = new FriendRequestViewModel(friendId);
    console.log(model);
    
    return this.http.post<any>(`${environment.apiUrl}/api/friends/request`, model)
   }

   acceptFriendRequest(relationshipId : string){
    var model :  RequestAnswerView = new RequestAnswerView(relationshipId);
    return this.http.put<any>(`${environment.apiUrl}/api/friends/accept`, model);
   }
   declineFriendRequest(relationshipId : string, profileId : string){
    var model :  RequestAnswerView = new RequestAnswerView(relationshipId);
    return this.http.put<any>(`${environment.apiUrl}/api/friends/decline`, model).subscribe();
   }

   getFriends(){
     return this.http.get<any>(`${environment.apiUrl}/api/friends`)
   }
}

