export interface MessageDto{
    messageId : number;
    senderId : number;
    senderUserName : string;
    senderPhotoUrl: string;
    receiverId : number;
    receiverUserName : string;
    receiverPhotoUrl: string;
    content : string;
    dateRead : Date;
    messageSent : Date;
    isRead : boolean
}

