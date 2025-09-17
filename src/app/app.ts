import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav';
import { UserDto } from './DTOs/UserDto';
import { AccountService } from './services/account-service';
import { CommonModule } from '@angular/common';
import {NgxSpinnerModule} from 'ngx-spinner';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxPaginationModule } from 'ngx-pagination';
import {ModalModule} from 'ngx-bootstrap/modal';
import { PresenceService } from './services/presence-service';




@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    Nav, 
    CommonModule, 
    NgxSpinnerModule, 
    FileUploadModule, 
    ReactiveFormsModule, 
    FormsModule,
    NgxPaginationModule,
    ModalModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected title = 'DatingAppClient';
  users: any;

  constructor(private accountService: AccountService, private presenceService: PresenceService){}

  ngOnInit(): void {
    //this.getUsers();
    this.setCurrentUser();
  }


  setCurrentUser(){
    const user: UserDto = JSON.parse(localStorage.getItem('user'));
    if (user){
      this.accountService.setCurrentUser(user);
      this.presenceService.createHubConnection(user);

    } else {
      this.accountService.setCurrentUser(null);
      this.presenceService.stopHubConnection();
    }
  }

}
