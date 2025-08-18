import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormsModule, AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../services/account-service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { CommonModule, JsonPipe } from '@angular/common';
import { RegisterDto } from '../DTOs/RegisterDto';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{

  @Output() close:EventEmitter<boolean> = new EventEmitter<boolean>();

  model: RegisterDto;
  registerForm: FormGroup;
  
  constructor(
    private accountService: AccountService, 
    private router:Router, 
    private formBuilder: FormBuilder,
    private toast: ToastrService){}


ngOnInit(): void {
  this.initRegisterForm();
}

initRegisterForm(){
  this.registerForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    password: ['', [Validators.required,  Validators.minLength(5), Validators.maxLength(20)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    gender: ['male', Validators.required],
    knownAs: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    age: ['', Validators.required],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    country: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  }, {validators: this.confirmPasswordValidator});
}

onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(user => {
      this.cancel();
      this.router.navigateByUrl('/');
      this.toast.success('Success', 'Register is successfully');
    }, error => {
      this.registerForm.markAllAsTouched();
      console.log(error)
    })
}

 confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
     return control?.value.password === control.value.confirmPassword ?
       null : { PasswordNoMatch: true };
}

cancel(){
    this.close.emit(false);
  }

}
