import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { MessageDto } from '../../DTOs/MessageDto';
import { MessageService } from '../../services/message-service';
import { Subscription, take } from 'rxjs';
import {FormsModule} from '@angular/forms';
import { TimeAgoPipe } from '../../utilities/time-ago-pipe';
import { AsyncPipe } from '@angular/common';
import { AccountService } from '../../services/account-service';
import { UserDto } from '../../DTOs/UserDto';
import { MemberDTO } from '../../DTOs/MemberDto';


@Component({
  selector: 'app-message-member',
  imports: [FormsModule, TimeAgoPipe, AsyncPipe],
  templateUrl: './message-member.html',
  styleUrl: './message-member.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessageMember implements OnDestroy {
  
  private sub = new Subscription();
  messageContent = '';
  loading: boolean = false;
  //@Input() messages: MessageDto[] = [];
  @Input() userName: string;

  @Input() currentUser: UserDto;
  @Input() member: MemberDTO;

  constructor(public messageService: MessageService, public accountService: AccountService){}

  // onSubmit(){
  //   const sub$ = this.messageService.sendMessage(this.userName, this.messageContent).subscribe(message => {
  //     this.messages.push(message);
  //     this.messageContent = '';
  //   });
  //   this.sub.add(sub$);
  // }

  onSubmit(){
    this.messageService.addMessage(this.messageContent, this.member.userName).then(response => this.messageContent = '');
  }

   ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
