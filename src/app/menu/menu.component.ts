import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FriendDTO } from '../Dto/friend-dto';
import { MessageDTO } from '../Dto/message-dto';
import { PotentialContactView } from '../models/potential-contact-view';
import { Profile } from '../models/profile';
import { User } from '../models/user';
import { ContactService } from '../services/contact.service';
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

   myProfile: User;
   message !: string;
   searchdata: FormGroup;
   observableOfSearchParameter : any;
   
   potentialContacts : Array<PotentialContactView> = [];



   favorites: Array<FriendDTO> = [];  
   normals: Array<FriendDTO> = [];  
   group: Array<FriendDTO> = [];   
   messages : Array<MessageDTO> = []; 

  constructor(private userService : UserService, private fb: FormBuilder, private contactService : ContactService) { 
    this.UserInfo();
   
   
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
    
    this.getMockContacts();
    this.getMockMessages();
  }

  switchTab(tabName : string) {
    this.currentTab = tabName;
  }

  getMockContacts(){
    this.normals = [{name : 'Product 001', lastMessagedName : 'Product 008', lastMessagedMessage : 'Is everything alri....', identifier : 'qdadasdas'},
    {name : 'Product 002', lastMessagedName : 'Product 003', lastMessagedMessage : 'That sounds l...', identifier : 'qdadacsdas'},
    {name : 'Product 003', lastMessagedName : 'Product 008', lastMessagedMessage : 'Thats allowed?', identifier : 'qdadaasdas'},
    {name : 'Product 004', lastMessagedName : 'Product 004', lastMessagedMessage : 'really?', identifier : 'qdadsasdas'},
    {name : 'Product 005', lastMessagedName : 'Product 008', lastMessagedMessage : 'really?', identifier : 'qdadasdas'},
    {name : 'Product 006', lastMessagedName : 'Product 006', lastMessagedMessage : 'seriously', identifier : 'qdvbadasdas'},
    {name : 'Product 007', lastMessagedName : 'Product 008', lastMessagedMessage : 'steven!', identifier : 'qdadas2das'}]

    this.favorites = [{name : 'Product 001', lastMessagedName : 'Product 008', lastMessagedMessage : 'Is everything alri....', identifier : 'qdadasdas'},
    {name : 'Product 007', lastMessagedName : 'Product 008', lastMessagedMessage : 'steven!', identifier : 'qdadas2das'}]

    this.group = [
    {name : 'Product 004', lastMessagedName : 'Product 004', lastMessagedMessage : 'really?', identifier : 'qdadsasdas'},
    {name : 'Product 005', lastMessagedName : 'Product 008', lastMessagedMessage : 'really?', identifier : 'qdadasdas'},
    {name : 'Product 007', lastMessagedName : 'Product 008', lastMessagedMessage : 'steven!', identifier : 'qdadas2das'}]
  }

  getMockMessages(){
    var number = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    if (number == 1){
      this.messages = [{senderID : '312213', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}]
    }else if (number == 2){
      this.messages = [{senderID : '312213', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}, {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}, {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '312213', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}]
    }else{
      this.messages = [{senderID : '312213', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}, {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}, {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}, {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}, {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}, {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}, {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}, {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}, {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}, {senderID : '213123', messageType :'TEXT', message : 'Should I ignore it? it seems kinda important.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '1231', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'},
      {senderID : '312213', messageType :'TEXT', message : 'This is a test message. please ignore it.', image : '', identifier : '3124qsdasdfsdgawerw'}]
    }
   
  }

sendMessage(){
  console.log(this.message)
   let myMessage : MessageDTO = new MessageDTO(this.myProfile.userId, this.message, "TEXT", "","123");
   this.messages.push(myMessage);
}

UserInfo(){
   this.userService.getUser().subscribe(
    (user : any) => {
      this.myProfile =  user.user;
    })
  };

  onClickSearchContacts(){
    this.contactService.getPotentialContacts(this.searchdata.controls['contactsearch'].value, this.myProfile.profile.userId).subscribe( (contacts : any) => 
      {
        console.log(contacts);
        this.potentialContacts = contacts.profiles;
        this.test();
      })
    
      console.log(this.potentialContacts);
   
  }

toggle(){
  this.menuIsActive = !this.menuIsActive;
  console.log(this.myProfile)
}

toggleSearchMenu(){
  console.log(this.friendMenuIsActive)
  this.friendMenuIsActive = !this.friendMenuIsActive;
}

test(){
  console.log(this.potentialContacts[0]);
}
}
