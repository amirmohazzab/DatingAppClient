import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../DTOs/LoginDto';
import { UserDto } from '../DTOs/UserDto';
import { map, ReplaySubject } from 'rxjs';
import { RegisterDto } from '../DTOs/RegisterDto';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  
  model: LoginDto;
  private baseUrl = "https://localhost:7024/api";
  //import.meta.env.NG_APP_BASE_API_URL;
  private currentUser = new ReplaySubject<UserDto>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient){}

  login(model){
    return this.http.post<UserDto>(`${this.baseUrl}/account/login`, model).pipe(map((response: UserDto ) => {
      if (response.token && response.userName){
          this.serCurrentUser(response);        
      }}))
    
    }

  
  register(model){
    return this.http.post<UserDto>(`${this.baseUrl}/account/register`, model).pipe(map((response: UserDto ) => {
      if (response.token && response.userName){
        this.serCurrentUser(response)
      }
      return response;
    }))

  }

  isExistUserName(userName: string){
    return this.http.get<boolean>(`${this.baseUrl}/account/isExitUserName/${userName}`,)
  }

  serCurrentUser(user: UserDto){
    if (user){
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUser.next(user);
    }
    
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }
}
