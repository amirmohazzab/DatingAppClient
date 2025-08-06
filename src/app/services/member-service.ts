import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberDTO } from '../DTOs/MemberDto';


const httpHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token);

@Injectable({
  providedIn: 'root'
})

export class MemberService {
  
  private baseUrl = "https://localhost:7024/api";
  constructor(private http: HttpClient){}

  getMembers(){
    return this.http.get<MemberDTO[]>(`${this.baseUrl}/users`);
  }

  getMemberByUserName(userName: string){
    return this.http.get<MemberDTO>(`${this.baseUrl}/users/getUserByUserName/${userName}`);
  }

    getMemberById(id: number){
    return this.http.get<MemberDTO>(`${this.baseUrl}/users/getUserById/${id}`);
  }
}
