import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../services/account-service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  @Output() close = new EventEmitter();

  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
  });

  constructor(private accountService: AccountService, private router:Router, private toast: ToastrService){}

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(user => {
      this.cancel();
      this.router.navigateByUrl('/');
      this.toast.success('Success', 'Register is successfully');
    }, error => {
      console.log(error)
    })
  }

  cancel(){
    this.close.emit();
  }
}
