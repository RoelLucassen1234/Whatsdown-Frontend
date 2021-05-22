import { animate, style, transition, trigger } from '@angular/animations';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { profile } from 'console';
import { FriendDTO } from '../Dto/friend-dto';
import { MessageDTO } from '../Dto/message-dto';
import { FriendViewModel } from '../models/friend-view-model';
import { MessageReturnView } from '../models/message';
import { MessageView } from '../models/message-view';
import { PendingRequest } from '../models/pending-request';
import { PotentialContactView } from '../models/potential-contact-view';
import { User } from '../models/user';
import { ContactService } from '../services/contact.service';
import { FriendService } from '../services/friend.service';
import { MessagingService } from '../services/messaging.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ width: 0, height: 800, opacity: 1 }),
            animate('0.4s ease-out', 
                    style({ width: 325, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ width: 325, opacity: 1 }),
            animate('0.4s ease-in', 
                    style({ width: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class MenuComponent implements OnInit {

   menuIsActive = true;
   friendMenuIsActive = true;
   currentTab = "contact";
   currentGroupCode = '';

   myProfile: User;
   message !: string;
   searchdata: FormGroup;
   areaMessage : any = '';
   
   observableOfSearchParameter : any;
   

   potentialContacts : Array<PotentialContactView> = [];
   pendingRequests : Array<PendingRequest> = []; 
   friends : Array<FriendViewModel> = [];


   favorites: Array<FriendDTO> = [];  
   normals: Array<FriendDTO> = [];  
   group: Array<FriendDTO> = [];   
   messages : Array<MessageReturnView> = []; 

  constructor(private userService : UserService, private fb: FormBuilder, private contactService : ContactService, private friendService : FriendService,
     private messageService : MessagingService) { 
 
    this.messageService.startConnection().then(() => {
         this.UserInfo();
         this.messageService.retrieveMappedObject().subscribe((receivedObj: MessageReturnView) => {this.addToInbox(receivedObj)});  // calls the service method to get the new messages sent
        })

    this.searchdata = this.fb.group({
      contactsearch: new FormControl()
   });
   this.observableOfSearchParameter = this.searchdata.controls['contactsearch'];
  
   this.observableOfSearchParameter.valueChanges.subscribe(  
    (value: string) => {  
      if (value.length > 4){
        this.onClickSearchContacts();
      }
    }
  );
  }

  ngOnInit(): void {
 
  }

  switchTab(tabName : string) {
    this.currentTab = tabName;
  }
  getFriends(){
    this.friendService.getFriends(this.myProfile.profile.profileId).subscribe((data : any) =>
      {
        console.log(data);
        this.friends = data.friends;
        var group :  Array<string> = []
        this.friends.forEach(element => {
          group.push(element.identificationCode)
        });

        this.messageService.JoinGroup(group);
        
      });
  }


UserInfo(){
   this.userService.getUser().subscribe(
    (user : any) => {
      this.myProfile =  user.user;
      this.getFriends();
    })
  };

  onClickSearchContacts(){
    this.contactService.getPotentialContacts(this.searchdata.controls['contactsearch'].value, this.myProfile.userId).subscribe((contacts : any) => 
      {
        console.log(contacts);
        this.potentialContacts = contacts.profiles;
      })
      console.log(this.potentialContacts);
  }

toggle(){
  this.menuIsActive = !this.menuIsActive;
  console.log(this.myProfile)
  this.getPotentialFriendRequestS()
}

toggleSearchMenu(){
  console.log(this.friendMenuIsActive)
  this.friendMenuIsActive = !this.friendMenuIsActive;
}

sendFriendRequest(friendProfileID : string){
  console.log(friendProfileID);
  this.friendService.sendFriendRequest(this.myProfile.profile.profileId, friendProfileID).subscribe(test =>
    {
      console.log(test);
    });
}

getPotentialFriendRequestS(){
  this.friendService.getPendingRequests(this.myProfile.profile.profileId).subscribe((requests : any) => 
  {
   
    this.pendingRequests = requests.pendingRequests;
    console.log(this.pendingRequests)
  });
}

acceptPendingRequest(relationId : string){
  console.log(relationId);
  this.friendService.acceptFriendRequest(relationId, this.myProfile.profile.profileId)
  this.pendingRequests = this.pendingRequests.filter(function( obj ) {
    return obj.relationId !== relationId;
});
}

rejectPendingRequest(relationId : string){
  this.friendService.declineFriendRequest(relationId, this.myProfile.profile.profileId)
  this.pendingRequests = this.pendingRequests.filter(function( obj ) {
    return obj.relationId !== relationId;
});
}

selectContact(profile : FriendViewModel){
this.currentGroupCode = profile.identificationCode;
if (profile.messages == null){
  this.messageService.getAllMessages(profile.identificationCode).subscribe(data => {
    profile.messages = data.messages;
    this.messages = profile.messages;
  });

}
this.messages = profile.messages;

}

sendTextMessage(text : string){
  console.log("Attmepting to send message")
  let test = new MessageView();
  test.identificationCode = this.currentGroupCode;
  test.message = text;
  test.senderId = this.myProfile.profile.profileId;
  test.type = "TEXT";
  this.messageService.SendTextMessage(test);
}

imagesPreview = (files : any) => {

  if (files.length == 0)
  return;

  var currentFile;
  const reader = new FileReader();   
	currentFile = files[0];
	reader.readAsDataURL(files[0]);
  
	reader.onload = (_event) => {
 
    if(reader.result != null){
      console.log("Start sending images");
      const formData = new FormData();
      formData.append('SenderId', this.myProfile.profile.profileId);
      formData.append('IdentificationCode', this.currentGroupCode);
      formData.append('Message', reader.result.toString());
      formData.append('Type', "IMAGE");
      this.messageService.SendImageMessage(formData);
    }
  }
}

addToInbox(obj: MessageReturnView) {
  console.log("test");
  this.friends.forEach(friend => {
    if(friend.identificationCode == obj.identificationCode){
        if(friend.messages == null){
          this.messageService.getAllMessages(obj.identificationCode).subscribe(data => {
            console.log(friend.messages)
            friend.messages = data.messages;
          
          })
        }
        else{
          var newArray = friend.messages;
          newArray.push(obj);
          friend.messages = newArray;
        }
        console.log(friend.messages)
    }
    
  });
 

}

}
