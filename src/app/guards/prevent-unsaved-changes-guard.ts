import { CanDeactivateFn } from '@angular/router';
import { EditMember } from '../members/edit-member/edit-member';
import { ConfirmService } from '../services/confirm-service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface IPreventUnsavedChanges {
  canDeactivate(): Observable<boolean> | boolean;
}

export const PreventUnsavedChangesGuard: CanDeactivateFn<EditMember> = (component, currentRoute, currentState, nextState) => {

  if(component.editMemberForm.dirty){
      return confirm('Are you sure?');
    }

  return true;
};
