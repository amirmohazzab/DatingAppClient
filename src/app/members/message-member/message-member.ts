import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageDto } from '../../DTOs/MessageDto';
import { MessageService } from '../../services/message-service';
import { Subscription } from 'rxjs';
import {FormsModule} from '@angular/forms';
import { TimeAgoPipe } from '../../utilities/time-ago-pipe';


@Component({
  selector: 'app-message-member',
  imports: [FormsModule, TimeAgoPipe],
  templateUrl: './message-member.html',
  styleUrl: './message-member.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessageMember implements OnInit, OnDestroy{
  
  private sub = new Subscription();
  messageContent = '';
  loading: boolean = false;
  @Input() messages: MessageDto[] = [];
  @Input() userName: string;

  constructor(private messageService: MessageService){}
  
  ngOnInit(): void {}

  onSubmit(){
    const sub$ = this.messageService.sendMessage(this.userName, this.messageContent).subscribe(message => {
      this.messages.push(message);
      this.messageContent = '';
    });
    this.sub.add(sub$);
  }

   ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }




}
