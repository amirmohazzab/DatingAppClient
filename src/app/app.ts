import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav';
import { UserDto } from './DTOs/UserDto';
import { AccountService } from './services/account-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected title = 'DatingAppClient';
  users: any;

  constructor(private accountService: AccountService){}

  ngOnInit(): void {
    //this.getUsers();
    this.setCurrentUser();
  }


  setCurrentUser(){
    const user: UserDto = JSON.parse(localStorage.getItem('user'));
    
    user ? this.accountService.serCurrentUser(user) : this.accountService.serCurrentUser(null)
  }

}
