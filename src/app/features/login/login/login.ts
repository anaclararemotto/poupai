import { Component } from '@angular/core';
import { LoginForm } from "../login-form/login-form";
import { LoginContent } from "../login-content/login-content";

@Component({
  selector: 'app-login',
  imports: [LoginForm, LoginContent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

}
