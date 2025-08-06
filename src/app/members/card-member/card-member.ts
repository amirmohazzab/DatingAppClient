import { Component, input, Input } from '@angular/core';
import { MemberDTO } from '../../DTOs/MemberDto';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-member',
  imports: [DatePipe, RouterModule],
  templateUrl: './card-member.html',
  styleUrl: './card-member.css'
})
export class CardMember {

  @Input() member: MemberDTO;
}
