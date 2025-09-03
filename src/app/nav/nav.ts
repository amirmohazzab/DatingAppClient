import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AccountService } from '../services/account-service';
import { Router, RouterModule } from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { UserDto } from '../DTOs/UserDto';
import { Observable,  } from 'rxjs';
import { AsyncPipe, CommonModule} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HasInRoleDirective} from "../directives/has-in-role.directive";

@Component({
  selector: 'app-nav',
  imports: [ReactiveFormsModule, RouterModule, BsDropdownModule, AsyncPipe, CommonModule, HasInRoleDirective],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})

export class Nav implements OnInit{

  //loggedIn: boolean = false;
  currentUser$: Observable<UserDto>;
  user: UserDto;

  loginForm = new FormGroup({
    userName : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    password : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
  });

  constructor(private accountService: AccountService, private router: Router, private toast: ToastrService){}

  ngOnInit(): void {
    //this.getCurrentUser();
    this.currentUser$ = this.accountService.currentUser$;
  }

  onSubmit(){
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    this.accountService.login(this.loginForm.value).subscribe((user: any) => {
      //this.loggedIn = true;
      this.router.navigateByUrl('/members');
      this.toast.success('Success', 'Login successful');
      
    })
  };

  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe(user => {
  //     //this.loggedIn = !!user;
  //   }, error => {
  //     //this.loggedIn = false;
  //     console.log(error);
  //   })
  // }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.toast.success('Logout Successful');
    //this.loggedIn = false;
  }
}
