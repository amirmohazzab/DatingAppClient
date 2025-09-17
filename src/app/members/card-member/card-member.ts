import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MemberDTO } from '../../DTOs/MemberDto';
import { RouterModule } from '@angular/router';
import { MemberService } from '../../services/member-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule} from '@angular/common';
import { PresenceService } from '../../services/presence-service';

@Component({
  selector: 'app-card-member',
  imports: [RouterModule, CommonModule],
  templateUrl: './card-member.html',
  styleUrl: './card-member.css'
})
export class CardMember implements OnInit{

  @Input() member: MemberDTO;
  @Output() likeToggled = new EventEmitter<any>();
  
  isLiked = false;
  likesCount = 0;
  
  constructor(private memberService: MemberService, private toast: ToastrService, public presenceService: PresenceService){}

  ngOnInit(): void {
    this.loadLikeStatus();
    this.loadLikesCount();
  }


  loadLikeStatus() {
    this.memberService.isLiked(this.member.userName).subscribe(res => {
       this.isLiked = res;
    });
  }

  loadLikesCount() {
    this.memberService.getLikesCount(this.member.userName).subscribe(res => {
      this.likesCount = res
    });
  }

  toggleLike(): void {
    if (this.isLiked) {
      this.memberService.removeLike(this.member.userName).subscribe(() => {
        this.isLiked = false;
        this.likesCount--;
        this.toast.info(`You unliked ${this.member.userName}`);
      });
    } else {
      this.memberService.addLike(this.member.userName).subscribe(() => {
        this.isLiked = true;
        this.likesCount++;
        this.toast.success(`You liked ${this.member.userName}`);
      });
    }
  }

}
