import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberDTO } from '../DTOs/MemberDto';
import { UpdateMemberDTO } from '../DTOs/UpdateMemberDto';
import { map, of, tap } from 'rxjs';
import { PhotoDto } from '../DTOs/PhotoDto';
import { UserDto } from '../DTOs/UserDto';


const httpHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token);

@Injectable({
  providedIn: 'root'
})

export class MemberService {
  
  private baseUrl = "https://localhost:7024/api";
  private members : MemberDTO[] = [];
  private member : MemberDTO;

  constructor(private http: HttpClient){}

  getMembers(){
    if (this.members.length > 0) return of(this.members);
    return this.http.get<MemberDTO[]>(`${this.baseUrl}/users`).pipe(tap(members => this.members = members));
  }

  getMemberByUserName(userName: string){
    const member = this.members.find(m => m.userName == userName);
    if (member !== undefined) return of(member);

    return this.http.get<MemberDTO>(`${this.baseUrl}/users/getUserByUserName/${userName}`);
  }

  getMemberById(id: number){
    const member = this.members.find(m => m.userId == id);
    if (member !== undefined) return of(member);

    return this.http.get<MemberDTO>(`${this.baseUrl}/users/getUserById/${id}`);
  }

  updateMember(updateMember: UpdateMemberDTO){
      return this.http.put<MemberDTO>(`${this.baseUrl}/users/UpdateUser`, updateMember).pipe(map(member => {
        const index = this.members.findIndex(m => m.userId === member.userId);
        this.members[index] = member;

        return member;
      }))
  }

  setMainPhoto(photoId: number){
    return this.http.put<PhotoDto>(`${this.baseUrl}/users/SetMainPhoto/${photoId}`, {})
  }

  deletePhoto(photoId: number){
    return this.http.delete<PhotoDto>(`${this.baseUrl}/users/DeletePhoto/${photoId}`)
  }

  addPhoto(file: FormData){
    return this.http.post<PhotoDto>(`${this.baseUrl}/users/add-photo`, file);
  }

  getAllPhotos(userName: string){
    return this.http.get<MemberDTO>(`${this.baseUrl}/users/get-photos/${userName}`).pipe(tap(member => this.member = member));
  }

}
