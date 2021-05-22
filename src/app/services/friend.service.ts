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

   getPendingRequests(userId : string){
    let params = new HttpParams().set("userId",userId);
    return this.http.get<FriendRequestViewModel>(`${environment.apiUrl}/api/friends/pending/`+ userId)
   }

   sendFriendRequest(userId : string, friendId: string){
    var model :  FriendRequestViewModel = new FriendRequestViewModel(userId,friendId);
    console.log(model);
    
    return this.http.post<any>(`${environment.apiUrl}/api/friends/request`, model)
   }

   acceptFriendRequest(relationshipId : string, profileId : string){
    var model :  RequestAnswerView = new RequestAnswerView(relationshipId,profileId);
    return this.http.put<any>(`${environment.apiUrl}/api/friends/accept`, model).subscribe();
   }
   declineFriendRequest(relationshipId : string, profileId : string){
    var model :  RequestAnswerView = new RequestAnswerView(relationshipId,profileId);
    return this.http.put<any>(`${environment.apiUrl}/api/friends/decline`, model).subscribe();
   }

   getFriends(profileId : string){
     return this.http.get<any>(`${environment.apiUrl}/api/friends/`+ profileId)
   }
}
