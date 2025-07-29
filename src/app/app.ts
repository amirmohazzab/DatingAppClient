import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav';
import { UserDto } from './DTOs/UserDto';
import { AccountService } from './services/account-service';
import { Register } from './register/register';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Register, Home],
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

  // getUsers(){
  //   this.http.get("https://localhost:7024/api/users").subscribe(data => {
  //     console.log(data);
  //     this.users = data;
  //   }, error => {
  //     console.log(error)
  //   }, () => {
  //     console.log('done');
  //   })
  // }


  setCurrentUser(){
    const user: UserDto = JSON.parse(localStorage.getItem('user'));
    this.accountService.serCurrentUser(user);
  }

}
