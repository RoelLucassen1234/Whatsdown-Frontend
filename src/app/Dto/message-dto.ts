export class MessageDTO {
    
    constructor( public senderID : string ,
    public message : string ,
    public messageType : string ,
    public image : string,
    public identifier : string,
    public date? : Date){}

}
