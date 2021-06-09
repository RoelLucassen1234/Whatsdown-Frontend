import { animate, style, transition, trigger } from '@angular/animations';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { profile } from 'console';
import { FriendDTO } from '../Dto/friend-dto';
import { MessageDTO } from '../Dto/message-dto';
import { BasicFriendView } from '../models/basic-friend-view';
import { FriendViewModel } from '../models/friend-view-model';
import { JWT } from '../models/jwt';
import { MessageReturnView } from '../models/message';
import { MessageView } from '../models/message-view';
import { PartlyPendingRequests } from '../models/partly-pending-requests';
import { PendingRequest } from '../models/pending-request';
import { PotentialContactView } from '../models/potential-contact-view';
import { RecentMessageView } from '../models/recent-message-view';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { ContactService } from '../services/contact.service';
import { FriendService } from '../services/friend.service';
import { LocationService } from '../services/location.service';
import { MessagingService } from '../services/messaging.service';
import { ProfileService } from '../services/profile.service';
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
   profileIds : string[] = [];
   myProfile: User;
   jwt : JWT;
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
     private messageService : MessagingService, private locationService : LocationService, private authService :AuthService, private profileService : ProfileService) { 
      
    this.jwt = this.authService.userValue;
    this.messageService.startConnection().then(() => {
         this.getFriends();
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

  

  async getFriends(){
    
   await this.friendService.getFriends(this.authService.userValue.id).subscribe(async (data : any) =>
      {
        let test : FriendViewModel[] = [];
        let basicFriends : BasicFriendView[] = [];
        basicFriends = data.friend;

          basicFriends.forEach( element => {
          console.log(element.relationCode);
          var model = new FriendViewModel();
          model.identificationCode = element.relationCode;
          model.profileId = element.profileId;
          this.profileIds.push(element.relationCode);
    
          test.push(model);
        });
      
        console.log("IDs " + this.profileIds);
        console.log(test);
        /////////////////////

       await test.forEach(element => {
          this.profileService.GetProfile(element.profileId).subscribe((profile : any) =>{
            element.profile = profile.profile;
          })
        });
        console.log(this.profileIds)
        await this.messageService.GetRecentMessagesFromList(this.profileIds).subscribe((recentData : any) => {
          
          var messages : RecentMessageView[] = [];
          messages = recentData.messages;
          console.log(messages);
          messages.forEach(element => {
           test.forEach(friend => {
       
              if (element.identificationCode == friend.identificationCode){
                friend.lastMessage = element.mostRecentMessage;
                friend.lastMessageDate = element.date;
             
                if (friend.profile.profileId == element.senderId){
                  friend.lastMessageName = friend.profile.displayName;
                }else{
                 friend.lastMessageName = "You";
                }
                console.log(friend);
              
              }
            });
            
          });

          this.friends = test;
       
         })
        
        var group :  Array<string> = []
        this.friends.forEach(element => {
          group.push(element.identificationCode)
        });

        this.messageService.JoinGroup(group);
        
      });

  
  }




  onClickSearchContacts(){
    this.profileService.GetPotentialProfiles(this.searchdata.controls['contactsearch'].value, this.authService.userValue.id).subscribe((contacts : any) => 
    {
      console.log(contacts);
      this.potentialContacts = contacts.profiles;
      console.log(this.potentialContacts);
    });
   
  }

toggle(){
  this.menuIsActive = !this.menuIsActive;
  
  this.getPotentialFriendRequestS()
}

toggleSearchMenu(){
  console.log(this.friendMenuIsActive)
  this.friendMenuIsActive = !this.friendMenuIsActive;
}

sendFriendRequest(friendProfileID : string){
  console.log(friendProfileID);
  this.friendService.sendFriendRequest(this.authService.userValue.id, friendProfileID).subscribe(test =>
    {
      console.log(test);
    });
}

getPotentialFriendRequestS(){

  this.friendService.getPendingRequests(this.authService.userValue.id).subscribe((requests : any) => 
  {

    let PartlyPendingRequests : Array<PartlyPendingRequests> = []; 

    PartlyPendingRequests = requests.pendingRequests;
    console.log(PartlyPendingRequests);
    console.log(requests.pendingRequests);
   
    PartlyPendingRequests.forEach(element => {
      var teststring = element.profileId;
      console.log("This is the profilestring: " + teststring)
      
      this.profileService.GetProfile(teststring.toString()).subscribe((data : any )=> {
        this.pendingRequests.push(new PendingRequest(data.profile.displayName, data.profile.displayName, element.profileId))
      })
    });
    


    
    
   
  });
}

acceptPendingRequest(relationId : string){
  console.log(relationId);
  this.friendService.acceptFriendRequest(relationId, this.authService.userValue.id).subscribe(data => {
    console.log("Accepting request");
    this.pendingRequests = this.pendingRequests.filter(function( obj ) {
      return obj.relationId !== relationId;
  });
  })
 
}

rejectPendingRequest(relationId : string){
  this.friendService.declineFriendRequest(relationId, this.authService.userValue.id)
  this.pendingRequests = this.pendingRequests.filter(function( obj ) {
    return obj.relationId !== relationId;
});
}

selectContact(profile : FriendViewModel){
this.currentGroupCode = profile.identificationCode;
if (profile.messages == null){
  this.messageService.getAllMessages(profile.identificationCode).subscribe(data => {
    console.log(data.messages);
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
  test.senderId = this.authService.userValue.id;
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
      formData.append('SenderId', this.authService.userValue.id);
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

sendLocationMessage(){
  this.locationService.getIPAddress().subscribe((data : any) =>
    {
      var test = JSON.stringify(data);
      this.locationService.getLocation(data).subscribe(data =>{
        var message = "Hello, my location i am currently in:" + data.test.country_name + " in the city " + data.test.city;
        this.sendTextMessage(message);
      });
    },
    err => {
      this.locationService.getLocation(err.error.text).subscribe(data =>{
        var message = "Hello, my location i am currently in:" + data.test.country_name + " in the city " + data.test.city;
        this.sendTextMessage(message);
        
      
    });
  });
}

autogrow(){
  let textArea = <any>document.getElementById("message");
  textArea.style.height = '0px';
  if(textArea.scrollHeight > 160)
    textArea.style.height = '160px';
  else
    textArea.style.height = textArea.scrollHeight + 'px';
}


}
