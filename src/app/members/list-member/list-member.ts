import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member-service';
import { MemberDTO } from '../../DTOs/MemberDto';
import { CommonModule } from '@angular/common';
import { CardMember } from "../card-member/card-member";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-member',
  imports: [CommonModule, CardMember],
  templateUrl: './list-member.html',
  styleUrl: './list-member.css'
})
export class ListMember implements OnInit{

  //members: MemberDTO[] = [];
  members$ = new Observable<MemberDTO[]>();

  constructor(private memberService: MemberService){}

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }


}
