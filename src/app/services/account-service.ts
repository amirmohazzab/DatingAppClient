import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../DTOs/LoginDto';
import { UserDto } from '../DTOs/UserDto';
import { map, ReplaySubject } from 'rxjs';
import { RegisterDto } from '../DTOs/RegisterDto';
import { PresenceService } from './presence-service';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  
  model: LoginDto;
  private baseUrl = "https://localhost:7024/api";
  //import.meta.env.NG_APP_BASE_API_URL;
  private currentUser = new ReplaySubject<UserDto>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private presenceService: PresenceService){}

  login(model){
    return this.http.post<UserDto>(`${this.baseUrl}/account/login`, model).pipe(map((user: UserDto ) => {
      if (user.token && user.userName){
          this.setCurrentUser(user);     
          this.presenceService.createHubConnection(user);   
      }}))
  }
  
  register(model){
    return this.http.post<UserDto>(`${this.baseUrl}/account/register`, model).pipe(map((response: UserDto ) => {
      if (response.token && response.userName){
        this.setCurrentUser(response)
      }
      return response;
    }))

  }

  isExistUserName(userName: string){
    return this.http.get<boolean>(`${this.baseUrl}/account/isExitUserName/${userName}`,)
  }

  setCurrentUser(user: UserDto){
    if (user){
      user.roles = [];
      const roles = this.getDecodedToken(user.token)?.role;
      if (roles) 
        Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUser.next(user);
    }
    
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this.presenceService.stopHubConnection();
  }

  private getDecodedToken(token: string){
    return JSON.parse(atob(token.split('.')[1]))
  }
}
