import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../services/account-service';

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

  constructor(private accountService: AccountService){}

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(user => {
      console.log(user)
    }, error => {
      console.log(error)
    })
  }

  cancel(){
    this.close.emit();
  }
}
