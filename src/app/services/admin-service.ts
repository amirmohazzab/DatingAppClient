import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../DTOs/UserDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = "https://localhost:7024/api";

  constructor(private http: HttpClient){}

  getUsersWithRoles(){
    return this.http.get<UserDto[]>(`${this.baseUrl}/admin/getUsersWithRoles`)
  }

  editUserRoles(userName: string, roles: string[]){
    return this.http.post(`${this.baseUrl}/admin/edit-role/${userName}` + '?roles=' + roles, {});
  }
  
}
