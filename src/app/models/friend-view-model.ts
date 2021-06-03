
import { MessageReturnView } from "./message";
import { MessageView } from "./message-view";
import { PendingRequest } from "./pending-request";
import { Profile } from "./profile";

export class FriendViewModel {
    public profile : Profile;
    public profileImage : string;
    public profileId : string;
    public lastMessage : string; 
    public lastMessageName : string;
    public identificationCode : string;
    public lastMessageDate : Date;
    public messages : Array<MessageReturnView>

    
}
