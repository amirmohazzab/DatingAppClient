import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message-service';
import { MessageParams } from '../DTOs/MessageParams';
import { PaginationResult } from '../DTOs/Pagination';
import { MessageDto } from '../DTOs/MessageDto';
import { PaginationModule } from "ngx-bootstrap/pagination";
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { finalize } from 'rxjs';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from '../utilities/time-ago-pipe';

@Component({
  selector: 'app-message',
  imports: [PaginationModule, CommonModule, FormsModule, RouterModule, TimeAgoPipe],
  templateUrl: './message.html',
  styleUrl: './message.css'
})
export class Message implements OnInit{

  messageParams: MessageParams;
  result : PaginationResult<MessageDto[]>;
  loading : boolean = false;

  constructor(private messageService: MessageService){
    this.messageParams = this.messageService.getMessageParams();
  }

  ngOnInit(): void {
   this.loadMessages();
  }

  changeContainer(container : string){
    this.messageParams.container = container;
    this.messageService.setMessageParams(this.messageParams);
    this.loadMessages();
  }

  pageChanged(event: any){
     this.messageParams.pageNumber = event.page;
     this.messageService.setMessageParams(this.messageParams);
     this.loadMessages();
  }

  loadMessages(){
    this.loading = true;
    this.messageService.getMessages(this.messageParams).pipe(finalize(() => {this.loading = false})).subscribe(response => {
        this.result = response;
    })
  }


}
