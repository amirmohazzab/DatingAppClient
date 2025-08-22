import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardMember } from '../../members/card-member/card-member';
import { MemberService } from '../../services/member-service';
import { PaginationResult } from '../../DTOs/Pagination';
import { MemberDTO } from '../../DTOs/MemberDto';
import { UserLikeParams } from '../../enums/likeUser';

@Component({
  selector: 'app-home-list',
  imports: [FormsModule, CardMember],
  templateUrl: './home-list.html',
  styleUrl: './home-list.css'
})
export class HomeList implements OnInit{

  result: PaginationResult<MemberDTO[]>;
  userLikeParams = new UserLikeParams();

  constructor(private memberService: MemberService){}

  ngOnInit(): void {
    this.memberService.getUserLikes(this.userLikeParams).subscribe(res => {
      this.result = res;
    });
  }

  pageChanged(event: any){
      this.result.currentPage = event?.page;
      this.userLikeParams.pageNumber = event?.page;
  }
}
