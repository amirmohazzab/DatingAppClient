import { Routes } from '@angular/router';
import { Home } from './home/home';
import { HomeMessage } from './messages/home-message/home-message';
import { HomeList } from './list/home-list/home-list';
import { DetailMember } from './members/detail-member/detail-member';
import { NotFound } from './not-found/not-found';
import { AuthGuard } from './guards/auth-guard';
import { ListMember } from './members/list-member/list-member';
import { EditMember } from './members/edit-member/edit-member';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes-guard';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'members', component: ListMember, canActivate: [AuthGuard]},
    {path: 'member/edit', component: EditMember,  pathMatch: 'full', canActivate: [AuthGuard], canDeactivate: [PreventUnsavedChangesGuard]},
    {path: 'member/:username', component: DetailMember,  pathMatch: 'full', canActivate: [AuthGuard]},
    {path: 'list', component: HomeList, canActivate: [AuthGuard]},
    {path: 'messages', component: HomeMessage, canActivate: [AuthGuard]},
    {path: 'not-found', component: NotFound},
    {path: '**', component: NotFound},
];
