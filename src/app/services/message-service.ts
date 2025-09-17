import { Injectable } from '@angular/core';
import { MessageParams } from '../DTOs/MessageParams';
import { MessageDto } from '../DTOs/MessageDto';
import { PaginationResult } from '../DTOs/Pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../DTOs/UserDto';
import { LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = "https://localhost:7024/api";
  private messageParams : MessageParams = new MessageParams();

  private hubUrl = "https://localhost:7024/hubs";
  private hubConnection: HubConnection;

  private messageThreadSource = new BehaviorSubject<MessageDto[]>([]);
  messageThreadSource$ = this.messageThreadSource.asObservable();


  constructor(private http: HttpClient){}

  async createHubConnection(user: UserDto, otherUser: string){
    this.hubConnection = new HubConnectionBuilder().withUrl(this.hubUrl + '/message?user=' + otherUser, {
      accessTokenFactory: () => user?.token
    }).withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

    this.hubConnection.serverTimeoutInMilliseconds = 60000;

    try{
      await this.hubConnection.start().catch(err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }

    this.hubConnection.on("ReceiveMessageThread", (messages: MessageDto[]) => {
      this.messageThreadSource.next(messages);
    });
    
    this.hubConnection.on("NewMessage", (message) => {
      this.messageThreadSource.next([...this.messageThreadSource.getValue(), message])
    })
  }

  stopHubConnection(){
    this.hubConnection.stop().catch(err => {
      console.log(err);
    })
  }

  async addMessage(content: string, recipientUserName: string)
  {
    if (this.hubConnection && this.hubConnection.state === HubConnectionState.Connected) {
      try{
        return await this.hubConnection.invoke("SendMessage", {content, recipientUserName})
      } catch (err) {
      console.log(err);
      }
    }
  }

  getMessages(messageParams: MessageParams){
   
        let params = this.setParams(messageParams);
        return this.http.get<PaginationResult<MessageDto[]>>(`${this.baseUrl}/message`, {params});
  }

  getMessageThread(userName: string){
    var messages = this.http.get<MessageDto[]>(`${this.baseUrl}/Message/Thread/${userName}`);
    console.log(messages);
    return messages;
  }

  sendMessage(recipientUserName: string, content: string){
    return this.http.post<MessageDto>(`${this.baseUrl}/message`, {recipientUserName, content})
  }

  private setParams(messageParams: MessageParams){
      let params = new HttpParams();
      if (messageParams?.pageNumber !== null && messageParams?.pageSize !== null){
        params = params.append('userName', messageParams.userName);
        params = params.append('container', messageParams.container);
        params = params.append('pageNumber', messageParams.pageNumber.toString());
        params = params.append('pageSize', messageParams.pageSize.toString());
      }
      
      return params;
  }

  getMessageParams(){
    return this.messageParams;
  }

  setMessageParams(messageParams: MessageParams){
    this.messageParams = messageParams;
  }

  resetMessageParams(messageParams: MessageParams){
    this.messageParams = new MessageParams();
    return this.messageParams
  }

}
