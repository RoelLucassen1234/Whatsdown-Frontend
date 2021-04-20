import { Component, OnInit } from '@angular/core';
import { FriendDTO } from '../Dto/friend-dto';
import { MessageDTO } from '../Dto/message-dto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
   currentTab = "contact";
   myID = '213123';
   favorites: Array<FriendDTO> = [];  
   normals: Array<FriendDTO> = [];  
   group: Array<FriendDTO> = [];   
   messages : Array<MessageDTO> = []; 

  constructor() { }

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

}
