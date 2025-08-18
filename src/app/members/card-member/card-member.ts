import { Component, Input } from '@angular/core';
import { MemberDTO } from '../../DTOs/MemberDto';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-member',
  imports: [RouterModule],
  templateUrl: './card-member.html',
  styleUrl: './card-member.css'
})
export class CardMember {

  @Input() member: MemberDTO;
}
