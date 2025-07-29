import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../DTOs/LoginDto';
import { UserDto } from '../DTOs/UserDto';
import { map, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  
  model: LoginDto;
  private baseUrl = 'https://localhost:7024/api';
  private currentUser = new ReplaySubject<UserDto>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient){}

  login(model){
    return this.http.post<UserDto>(`${this.baseUrl}/account/login`, model).pipe(map((response: UserDto ) => {
      if (response.token && response.userName){
        localStorage.setItem('user', JSON.stringify(response));
        this.currentUser.next(response);
      }}))
    
    }

  
  register(model){
    return this.http.post<UserDto>(`${this.baseUrl}/account/register`, model).pipe(map((response: UserDto ) => {
      if (response.token && response.userName){
        localStorage.setItem('user', JSON.stringify(response));
        this.currentUser.next(response);
      }
      return response;
    }))

  }


  serCurrentUser(user: UserDto){
    this.currentUser.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }
}
