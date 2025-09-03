import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin-service';
import { UserDto } from '../DTOs/UserDto';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagement } from "../user-management/user-management";
import { PhotoManagement } from "../photo-management/photo-management";

@Component({
  selector: 'app-admin',
  imports: [TabsModule, FormsModule, ReactiveFormsModule, UserManagement, PhotoManagement],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin{

  
  title: string;
  constructor(private route: ActivatedRoute){
    this.title = this.route?.snapshot?.data['title'] ?? '';
  }

 
}
