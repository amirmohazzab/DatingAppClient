import { Injectable } from '@angular/core';
import { MessageParams } from '../DTOs/MessageParams';
import { MessageDto } from '../DTOs/MessageDto';
import { PaginationResult } from '../DTOs/Pagination';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = "https://localhost:7024/api";
  private messageParams : MessageParams = new MessageParams();

  constructor(private http: HttpClient){}

  getMessages(messageParams: MessageParams){
   
        let params = this.setParams(messageParams);
        return this.http.get<PaginationResult<MessageDto[]>>(`${this.baseUrl}/message`, {params});
  }

  getMessageThread(userName: string){
    return this.http.get<MessageDto[]>(`${this.baseUrl}/Message/Thread/${userName}`)
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
