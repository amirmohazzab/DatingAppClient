import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { MemberService } from '../../services/member-service';
import { UserDto } from '../../DTOs/UserDto';
import { MemberDTO } from '../../DTOs/MemberDto';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { finalize } from 'rxjs';
import { PhotoEditMember } from '../photo-edit-member/photo-edit-member';

@Component({
  selector: 'app-edit-member',
  imports: [ReactiveFormsModule, FormsModule, TabsModule, PhotoEditMember],
  templateUrl: './edit-member.html',
  styleUrl: './edit-member.css'
})

export class EditMember implements OnInit{

  user: UserDto;
  member: MemberDTO;
  isSubmit: boolean = false;

  editMemberForm : FormGroup;

  constructor(private accountService: AccountService, private memberService: MemberService, private toast: ToastrService){}

  ngOnInit(): void {
    this.loadUser();
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMemberByUserName(this.user.userName).subscribe(member => {
      this.member = member;
      console.log(member);
      this.editMemberForm = new FormGroup({
        city : new FormControl(member.city),
        country : new FormControl(member.country),
        knownAs : new FormControl(member.knownAs),
        age : new FormControl(member.age),
        lastActive : new FormControl(member.lastActive),
        created : new FormControl(member.created),
        lookingFor : new FormControl(member.lookingFor),
        interests : new FormControl(member.interests),
        email : new FormControl(member.email, [Validators.email]),
        gender : new FormControl(member.gender),
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
    if (!this.editMemberForm.valid){
        this.editMemberForm.markAllAsTouched();
        return;
     }
     this.isSubmit = true;
     this.memberService.updateMember(this.editMemberForm.value).pipe(finalize(() => this.isSubmit = false)).subscribe(member => {
      console.log(member)
      this.member = member;
      this.toast.success('Update Member Success');
   }, error => {
    console.log(error);
   });
    
  }



}
