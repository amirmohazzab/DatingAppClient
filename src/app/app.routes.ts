import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Message } from './message/message';
import { HomeList } from './list/home-list/home-list';
import { DetailMember } from './members/detail-member/detail-member';
import { NotFound } from './not-found/not-found';
import { AuthGuard } from './guards/auth-guard';
import { ListMember } from './members/list-member/list-member';
import { EditMember } from './members/edit-member/edit-member';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes-guard';
import { AdminGuard } from './guards/admin-guard';
import { Admin } from './admin/admin';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'members', component: ListMember, canActivate: [AuthGuard]},
    {path: 'member/edit', component: EditMember,  pathMatch: 'full', canActivate: [AuthGuard], canDeactivate: [PreventUnsavedChangesGuard]},
    {path: 'member/:username', component: DetailMember,  pathMatch: 'full', canActivate: [AuthGuard]},
    {path: 'list', component: HomeList, canActivate: [AuthGuard]},
    {path: 'message', component: Message, canActivate: [AuthGuard]},
    {path: 'admin', component: Admin, canActivate: [AuthGuard, AdminGuard], data: {title: 'Admin Panel'}},
    {path: 'not-found', component: NotFound},
    {path: '**', component: NotFound},
];
