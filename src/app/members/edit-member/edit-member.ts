import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { MemberService } from '../../services/member-service';
import { UserDto } from '../../DTOs/UserDto';
import { MemberDTO } from '../../DTOs/MemberDto';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-member',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './edit-member.html',
  styleUrl: './edit-member.css'
})
export class EditMember implements OnInit{

  user: UserDto;
  member: MemberDTO;

  editMemberForm : FormGroup;

  constructor(private accountService: AccountService, private memberService: MemberService){}

  ngOnInit(): void {
    this.loadUser();
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMemberByUserName(this.user.userName).subscribe(member => {
      this.member = member;
      this.editMemberForm = new FormGroup({
        city : new FormControl(member.city),
        country : new FormControl(member.country),
        knownAs : new FormControl(member.knownAs),
        age : new FormControl(member.age),
        lastActive : new FormControl(member.lastActive),
        created : new FormControl(member.created),
        lookingFor : new FormControl(member.lookingFor),
        interests : new FormControl(member.interests),
        email : new FormControl(member.email),
        gender : new FormControl(member.email),
        introduction : new FormControl(member.introduction),
      });
    })
  }

  loadUser(){
    this.accountService.currentUser$.subscribe(user => {
      this.user = user
    })
  }

  onSubmit(){
    console.log(this.editMemberForm.value)
  }


}
