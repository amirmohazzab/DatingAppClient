import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member-service';
import { MemberDTO } from '../../DTOs/MemberDto';
import { CommonModule } from '@angular/common';
import { CardMember } from "../card-member/card-member";
import { PaginationResult } from '../../DTOs/Pagination';
import { FormsModule } from '@angular/forms';
import { Gender, OrderBy, TypeSort, UserParams } from '../../DTOs/UserParams';
import { PageChangedEvent, PaginationModule } from "ngx-bootstrap/pagination";
import { UserLikeParams } from '../../enums/likeUser';

@Component({
  selector: 'app-list-member',
  imports: [CommonModule, CardMember, FormsModule, PaginationModule],
  templateUrl: './list-member.html',
  styleUrl: './list-member.css'
})
export class ListMember implements OnInit {

  result : PaginationResult<MemberDTO[]>;
  userParams : UserParams;
  genders = Gender;
  orderBy = OrderBy;
  typeSort = TypeSort;
  userLikeParams = new UserLikeParams();
  likedUsers: any[] = [];

  constructor(private memberService: MemberService){
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  pageChanged(event: PageChangedEvent){
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  private loadMembers(){
    this.memberService.getMembers(this.userParams).subscribe(response => {
        this.result = response;
    })
  }

  onSubmit(){
    this.loadMembers();
  }

  onClear(){
    this.userParams = this.memberService.resetUserParams();   
    this.loadMembers();
  }

   onLikeToggled(updatedUser: any) {
    // می‌تونی اینجا هر کار اضافه‌ای انجام بدی
     console.log('Like status updated:', updatedUser);
   }
}
