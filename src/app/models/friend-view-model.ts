
import { MessageReturnView } from "./message";
import { MessageView } from "./message-view";
import { PendingRequest } from "./pending-request";

export class FriendViewModel {

    constructor(public displayName : string, public profileImage : string, public lastMessage : string, public lastMessageName : string,
         public identificationCode : string,
         public lastMessageDate : Date, public messages : Array<MessageReturnView> ){}
}
