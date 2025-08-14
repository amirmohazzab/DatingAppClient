import { CanDeactivateFn } from '@angular/router';
import { EditMember } from '../members/edit-member/edit-member';

export const PreventUnsavedChangesGuard: CanDeactivateFn<EditMember> = (component, currentRoute, currentState, nextState) => {

  if(component.editMemberForm.dirty){
      return confirm('Changes are not saved, do you want to exit?');
  }

  return true;
};
