import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';     
import { HttpTransportType } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FriendViewModel } from '../models/friend-view-model';
import { JoinGroupView } from '../models/join-group-view';
import { MessageReturnView } from '../models/message';
import { MessageView } from '../models/message-view';
@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private hubConnection: signalR.HubConnection
  private url : string = environment.apiUrl;
  private sharedObj = new Subject<MessageReturnView>();
  constructor(private http: HttpClient) {
  
   }

   public startConnection() : Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chathub`)
      .withAutomaticReconnect()
      .build();
    return this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
       this.hubConnection.on("GroupSend", (data : MessageReturnView) => this.ReceiveMessage(data))
    })
      .catch(err => console.log('Error while starting connection: ' + err))
  }
 
  public JoinGroup( groups : Array<string>){
    var model :  JoinGroupView = new JoinGroupView(groups,this.hubConnection.connectionId?.toString());
    return this.http.post<any>(`${environment.apiUrl}/api/group/join`, model).subscribe();
  }
  
  public SendTextMessage(message : MessageView){
    return this.http.post<any>(`${environment.apiUrl}/api/chat/post/text`, message).subscribe()
  }

  public SendImageMessage(data : any){
    return this.http.post<any>(`${environment.apiUrl}/api/chat/post/image`, data).subscribe()
  }

  public GetRecentMessagesFromList(data : string[]){
    console.log("Recent messages:")
    console.log(data);
    ;
    let params = "?";
    data.forEach(element => {
      params += "identificationCode=" + element;
    });
   return this.http.post<any>(`${environment.apiUrl}/chat/friends/recent`,data);

   
  }


  public retrieveMappedObject(): Observable<MessageReturnView> {
    return this.sharedObj.asObservable();
  }
  private ReceiveMessage(send : MessageReturnView){
    this.sharedObj.next(send);
    console.log(send)
  }

  public getAllMessages(id : string){
      return this.http.get<any>(`${environment.apiUrl}/api/group/` + id)
  }

  

}
