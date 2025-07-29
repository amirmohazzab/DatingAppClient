import { Component } from '@angular/core';
import { Register } from "../register/register";

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  registerMode: boolean = false;

  toggleRegisterMode(){
    this.registerMode = !this.registerMode;
  }
}
