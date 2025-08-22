import { Component, Input } from '@angular/core';
import { MemberDTO } from '../../DTOs/MemberDto';
import { RouterModule } from '@angular/router';
import { MemberService } from '../../services/member-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-card-member',
  imports: [RouterModule, CommonModule],
  templateUrl: './card-member.html',
  styleUrl: './card-member.css'
})
export class CardMember {

  @Input() member: MemberDTO;
  Liked: boolean = false;
  
  constructor(private memberService: MemberService, private toast: ToastrService){}

  AddLike(){
    if (this.Liked === false){
        this.memberService.addLike(this.member.userName).subscribe(() => {
          this.Liked = true;
          this.toast.success('User Like' + ' ' + this.member.userName);
    })
  }
    else{
      this.Liked = false;
    }
  }
}
