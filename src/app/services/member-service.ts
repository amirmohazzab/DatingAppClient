import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberDTO } from '../DTOs/MemberDto';
import { UpdateMemberDTO } from '../DTOs/UpdateMemberDto';
import { map, Observable, of, tap } from 'rxjs';
import { PhotoDto } from '../DTOs/PhotoDto';
import { PaginationResult } from '../DTOs/Pagination';
import { UserParams } from '../DTOs/UserParams';
import { PredicateLikeEnum, UserLikeParams } from '../enums/likeUser';


@Injectable({
  providedIn: 'root'
})

export class MemberService {
  
  private baseUrl = "https://localhost:7024/api";
  private members : MemberDTO[] = [];
  private member : MemberDTO;
  private userParams : UserParams = new UserParams();
  private cacheMember = new Map<string, PaginationResult<MemberDTO[]>>();
  private paginationResult: PaginationResult<MemberDTO[]> = new PaginationResult<MemberDTO[]>();

  constructor(private http: HttpClient){}

  getMembers(userParams: UserParams) : Observable<PaginationResult<MemberDTO[]>>{
    const key = Object.values(userParams).join('-');
    var response = this.cacheMember.get(key);
    if (response && response != null) return of(response);

    let params = this.setParams(userParams);
    return this.http.get<PaginationResult<MemberDTO[]>>(`${this.baseUrl}/users/getAllUsers`, {params}).pipe(map(response => {
      this.members = response.items;
      this.paginationResult= response;
      this.cacheMember.set(key, response);
      return response;
    }))
  
  }

  getMemberByUserName(userName: string){
    let user = [...this.cacheMember].reduce((arr, [key, value]) => arr.concat(value.items), []).find(u => u.userName == userName);
    if (user) return of(user);

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

  addLike(targetUserName: string){
    const params = new HttpParams().append('targetUserName', targetUserName);

    return this.http.post(`${this.baseUrl}/UserLikes/add-like`, {}, {params});
  }

  getUserLikes(userLikeParams: UserLikeParams){
      let params = new HttpParams();
      params = params.append('PageNumber', userLikeParams.pageNumber);
      params = params.append('PageSize', userLikeParams.pageSize);
      params = params.append('PredicateUserLike', userLikeParams.predicateUserLike.toString());

      return this.http.get<PaginationResult<MemberDTO[]>>(`${this.baseUrl}/UserLikes/get-likes`, {params})
  }

  setUserParams(userParams: UserParams){
    this.userParams = userParams;
  }

  getUserParams(){
    return this.userParams;
  }

  resetUserParams(){
    this.userParams = new UserParams();
    return this.userParams;
  }

  private setParams(userParams: UserParams){
    let params = new HttpParams();
    if (userParams?.pageNumber !== null && userParams?.pageSize !== null){

      params = params.append('pageNumber', userParams.pageNumber.toString());
      params = params.append('pageSize', userParams.pageSize.toString());
      params = params.append('minAge', userParams.minAge?.toString());
      params = params.append('maxAge', userParams.maxAge?.toString());
      params = params.append('gender', userParams.gender?.toString());
      params = params.append('orderBy', userParams.orderBy?.toString());
      params = params.append('typeSort', userParams.typeSort?.toString());
    }
    
    return params;
  }

}
