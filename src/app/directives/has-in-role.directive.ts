import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../services/account-service';
import { first } from 'rxjs';
import { UserDto } from '../DTOs/UserDto';

@Directive({
  selector: '[appHasInRole]'
})
export class HasInRoleDirective {

  user: UserDto
  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private accoutService: AccountService) { }
  
  @Input() set appHasInRole(roles: string[]){
    this.accoutService.currentUser$.pipe(first()).subscribe(user => {

        this.user = user;
        if (!this.user){
            this.viewContainerRef.clear();
            return;
        }
        if (!this.user?.roles && this.user){
            this.viewContainerRef.clear();
            return;
        }
        if (this.user?.roles.some(role => roles.includes(role))){
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        else {
          this.viewContainerRef.clear();
        }
    })
  }


}
